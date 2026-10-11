-- ==============================================================================
-- DM MARİN Veritabanı Şeması ve Tabloları (Migration Script)
-- Supabase SQL Editor üzerinden doğrudan çalıştırılabilir.
-- ==============================================================================

-- 1. Servis Talepleri Tablosu
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    boat_name TEXT,
    marina_location TEXT,
    service_type TEXT,
    brand TEXT,
    model TEXT,
    message TEXT,
    preferred_contact TEXT,
    source_page TEXT,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
    consent BOOLEAN DEFAULT true NOT NULL,
    admin_notes TEXT,
    ip_hash TEXT
);

-- Kolonların mevcut tabloda eksik kalması durumunda güvenli ALTER eklemeleri
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'service_requests' AND column_name = 'admin_notes') THEN
        ALTER TABLE public.service_requests ADD COLUMN admin_notes TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'service_requests' AND column_name = 'ip_hash') THEN
        ALTER TABLE public.service_requests ADD COLUMN ip_hash TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'service_requests' AND column_name = 'updated_at') THEN
        ALTER TABLE public.service_requests ADD COLUMN updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
END $$;

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON public.service_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_requests_phone ON public.service_requests(phone);

-- RLS (Row Level Security)
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- 2. Marka Yönetimi Tablosu
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL UNIQUE,
    visible BOOLEAN DEFAULT true NOT NULL,
    order_index INTEGER DEFAULT 0 NOT NULL
);

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Herkes görünür markaları okuyabilir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'brands' AND policyname = 'Public read visible brands'
    ) THEN
        CREATE POLICY "Public read visible brands" ON public.brands
            FOR SELECT USING (visible = true);
    END IF;
END $$;

-- 3. Site ve SEO Ayarları Tablosu
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Varsayılan markaları ekle (mevcut değilse)
INSERT INTO public.brands (name, visible, order_index)
VALUES 
    ('Volvo Penta', true, 1),
    ('MAN Marine', true, 2),
    ('MTU', true, 3),
    ('CAT', true, 4),
    ('Yamaha Marine', true, 5),
    ('Yanmar', true, 6),
    ('Suzuki Marine', true, 7),
    ('Kubota', true, 8),
    ('Mercedes-Benz / Daimler', true, 9),
    ('Mitsubishi', true, 10),
    ('Cummins Onan', true, 11),
    ('Kohler', true, 12),
    ('Fischer Panda', true, 13),
    ('Northern Lights', true, 14),
    ('Northstar', true, 15),
    ('Coelmo', true, 16),
    ('Baudouin', true, 17),
    ('Nanni Diesel', true, 18)
ON CONFLICT (name) DO UPDATE 
SET visible = EXCLUDED.visible, order_index = EXCLUDED.order_index;

-- ==============================================================================
-- 4. ERP Ürünler & Stok Tablosu (Atomik Stok & Negatif Stok Koruması)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.erp_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    oem_ref TEXT,
    cross_ref TEXT,
    barcode TEXT,
    brand TEXT,
    category TEXT,
    location TEXT,
    currency TEXT DEFAULT 'TRY',
    buy_price NUMERIC(12,2) DEFAULT 0,
    sell_price NUMERIC(12,2) DEFAULT 0,
    qty INTEGER DEFAULT 0 NOT NULL,
    min_qty INTEGER DEFAULT 2 NOT NULL,
    notes TEXT,
    CONSTRAINT chk_erp_products_qty_non_negative CHECK (qty >= 0)
);

CREATE INDEX IF NOT EXISTS idx_erp_products_code ON public.erp_products(code);
CREATE INDEX IF NOT EXISTS idx_erp_products_barcode ON public.erp_products(barcode);
CREATE INDEX IF NOT EXISTS idx_erp_products_name ON public.erp_products(name);

ALTER TABLE public.erp_products ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 5. ERP Müşteriler & Tedarikçiler Tabloları
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.erp_customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    boat_name TEXT,
    marina TEXT,
    balance NUMERIC(12,2) DEFAULT 0 NOT NULL,
    notes TEXT
);

ALTER TABLE public.erp_customers ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.erp_suppliers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    contact_person TEXT,
    balance NUMERIC(12,2) DEFAULT 0 NOT NULL,
    notes TEXT
);

ALTER TABLE public.erp_suppliers ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 6. ERP Satışlar Ana Tablosu
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.erp_sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    invoice_no TEXT,
    customer_id UUID REFERENCES public.erp_customers(id) ON DELETE SET NULL,
    customer_name TEXT,
    boat_name TEXT,
    items JSONB DEFAULT '[]'::jsonb NOT NULL,
    total NUMERIC(12,2) DEFAULT 0 NOT NULL,
    paid NUMERIC(12,2) DEFAULT 0 NOT NULL,
    discount NUMERIC(12,2) DEFAULT 0 NOT NULL,
    pay_method TEXT DEFAULT 'cash',
    status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'cancelled')),
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    operator TEXT,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_erp_sales_customer_id ON public.erp_sales(customer_id);
CREATE INDEX IF NOT EXISTS idx_erp_sales_date ON public.erp_sales(date DESC);

ALTER TABLE public.erp_sales ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 7. ERP Satış Kalemleri (Normalized İlişkisel Tablo & Foreign Key Koruması)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.erp_sale_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sale_id UUID NOT NULL REFERENCES public.erp_sales(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.erp_products(id) ON DELETE RESTRICT,
    product_name TEXT NOT NULL,
    qty INTEGER NOT NULL CHECK (qty > 0),
    unit_price NUMERIC(12,2) DEFAULT 0 NOT NULL,
    total_price NUMERIC(12,2) GENERATED ALWAYS AS (qty * unit_price) STORED,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_erp_sale_items_sale_id ON public.erp_sale_items(sale_id);
CREATE INDEX IF NOT EXISTS idx_erp_sale_items_product_id ON public.erp_sale_items(product_id);

ALTER TABLE public.erp_sale_items ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 8. Eşzamanlı Stok Düşümünde Race Condition Önleme Fonksiyonu (Pessimistic Row Lock)
-- ==============================================================================
CREATE OR REPLACE FUNCTION deduct_inventory_stock(
    p_item_id UUID,
    p_qty INT
) RETURNS VOID AS $$
DECLARE
    v_current_stock INT;
    v_product_name TEXT;
BEGIN
    IF p_qty <= 0 THEN
        RETURN;
    END IF;

    -- 1. Satır düzeyinde kilitleme (FOR UPDATE)
    -- Eşzamanlı iki işlem aynı satıra geldiğinde, ikinci işlem birincinin bitmesini bekler.
    SELECT qty, name INTO v_current_stock, v_product_name
    FROM public.erp_products
    WHERE id = p_item_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Ürün bulunamadı! ID: %', p_item_id;
    END IF;

    IF v_current_stock < p_qty THEN
        RAISE EXCEPTION 'Yetersiz stok! Ürün: "%", Mevcut: %, Talep edilen: %', v_product_name, v_current_stock, p_qty;
    END IF;

    -- 2. Atomik stok düşümü
    UPDATE public.erp_products
    SET qty = qty - p_qty,
        updated_at = NOW()
    WHERE id = p_item_id AND qty >= p_qty;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Stok güncelleme başarısız! Eşzamanlı satış nedeniyle stok yetersiz.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Kullanıcı talimatındaki fonksiyon imzasıyla eşleme (Alias):
CREATE OR REPLACE FUNCTION deduct_inventory_for_work_order(
    p_item_id UUID,
    p_qty INT
) RETURNS VOID AS $$
BEGIN
    PERFORM deduct_inventory_stock(p_item_id, p_qty);
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 9. Atomik Satış ve Stok İşleme RPC Fonksiyonu (Tam ACID Garantisi)
-- ==============================================================================
CREATE OR REPLACE FUNCTION process_erp_sale_atomic(
    p_sale JSONB
) RETURNS JSONB AS $$
DECLARE
    v_sale_id UUID;
    v_item JSONB;
    v_prod_id UUID;
    v_qty INT;
    v_price NUMERIC;
    v_prod_name TEXT;
    v_created_sale JSONB;
BEGIN
    -- 1. Satış ana kaydını ekle
    INSERT INTO public.erp_sales (
        invoice_no, customer_id, customer_name, boat_name,
        items, total, paid, discount, pay_method, status, date, operator, notes
    ) VALUES (
        COALESCE(p_sale->>'invoice_no', p_sale->>'invoiceNo', ''),
        NULLIF(p_sale->>'customer_id', '')::UUID,
        COALESCE(p_sale->>'customer_name', p_sale->>'customerName', ''),
        COALESCE(p_sale->>'boat_name', p_sale->>'boatName', ''),
        COALESCE(p_sale->'items', '[]'::jsonb),
        COALESCE((p_sale->>'total')::NUMERIC, 0),
        COALESCE((p_sale->>'paid')::NUMERIC, 0),
        COALESCE((p_sale->>'discount')::NUMERIC, 0),
        COALESCE(p_sale->>'pay_method', p_sale->>'payType', 'cash'),
        COALESCE(p_sale->>'status', 'paid'),
        COALESCE((p_sale->>'date')::DATE, CURRENT_DATE),
        COALESCE(p_sale->>'operator', ''),
        COALESCE(p_sale->>'notes', '')
    ) RETURNING id INTO v_sale_id;

    -- 2. Her kalemi satır kilidi ile düş ve erp_sale_items tablosuna kaydet
    IF p_sale->'items' IS NOT NULL AND jsonb_typeof(p_sale->'items') = 'array' THEN
        FOR v_item IN SELECT * FROM jsonb_array_elements(p_sale->'items')
        LOOP
            BEGIN
                v_prod_id := NULLIF(COALESCE(v_item->>'prodId', v_item->>'productId', v_item->>'id'), '')::UUID;
            EXCEPTION WHEN OTHERS THEN
                v_prod_id := NULL;
            END;

            v_qty := COALESCE((v_item->>'qty')::INT, 1);
            v_price := COALESCE((v_item->>'price')::NUMERIC, (v_item->>'unitPrice')::NUMERIC, 0);
            v_prod_name := COALESCE(v_item->>'name', 'Ürün');

            IF v_prod_id IS NOT NULL THEN
                -- Atomik satır kilitli stok düşümü (yetersiz stokta transaction komple ROLLBACK olur)
                PERFORM deduct_inventory_stock(v_prod_id, v_qty);

                INSERT INTO public.erp_sale_items (
                    sale_id, product_id, product_name, qty, unit_price
                ) VALUES (
                    v_sale_id, v_prod_id, v_prod_name, v_qty, v_price
                );
            ELSE
                INSERT INTO public.erp_sale_items (
                    sale_id, product_id, product_name, qty, unit_price
                ) VALUES (
                    v_sale_id, NULL, v_prod_name, v_qty, v_price
                );
            END IF;
        END LOOP;
    END IF;

    SELECT to_jsonb(s.*) INTO v_created_sale FROM public.erp_sales s WHERE s.id = v_sale_id;
    RETURN v_created_sale;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 10. Trigger: erp_sales Doğrudan INSERT Yapıldığında Otomatik Stok Düşümü
-- ==============================================================================
CREATE OR REPLACE FUNCTION trg_fn_erp_sales_inventory_deduct()
RETURNS TRIGGER AS $$
DECLARE
    v_item JSONB;
    v_prod_id UUID;
    v_qty INT;
    v_price NUMERIC;
    v_prod_name TEXT;
BEGIN
    IF EXISTS (SELECT 1 FROM public.erp_sale_items WHERE sale_id = NEW.id) THEN
        RETURN NEW;
    END IF;

    IF NEW.items IS NOT NULL AND jsonb_typeof(NEW.items) = 'array' THEN
        FOR v_item IN SELECT * FROM jsonb_array_elements(NEW.items)
        LOOP
            BEGIN
                v_prod_id := NULLIF(COALESCE(v_item->>'prodId', v_item->>'productId', v_item->>'id'), '')::UUID;
            EXCEPTION WHEN OTHERS THEN
                v_prod_id := NULL;
            END;

            v_qty := COALESCE((v_item->>'qty')::INT, 1);
            v_price := COALESCE((v_item->>'price')::NUMERIC, (v_item->>'unitPrice')::NUMERIC, 0);
            v_prod_name := COALESCE(v_item->>'name', 'Ürün');

            IF v_prod_id IS NOT NULL THEN
                PERFORM deduct_inventory_stock(v_prod_id, v_qty);

                INSERT INTO public.erp_sale_items (
                    sale_id, product_id, product_name, qty, unit_price
                ) VALUES (
                    NEW.id, v_prod_id, v_prod_name, v_qty, v_price
                );
            END IF;
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_erp_sales_inventory_deduct ON public.erp_sales;
CREATE TRIGGER trg_erp_sales_inventory_deduct
AFTER INSERT ON public.erp_sales
FOR EACH ROW
EXECUTE FUNCTION trg_fn_erp_sales_inventory_deduct();

-- ==============================================================================
-- 11. Trigger: Satış Silindiğinde Stokların Otomatik İadesi
-- ==============================================================================
CREATE OR REPLACE FUNCTION trg_fn_erp_sales_inventory_restore()
RETURNS TRIGGER AS $$
DECLARE
    v_item RECORD;
BEGIN
    FOR v_item IN SELECT product_id, qty FROM public.erp_sale_items WHERE sale_id = OLD.id
    LOOP
        IF v_item.product_id IS NOT NULL THEN
            UPDATE public.erp_products
            SET qty = qty + v_item.qty,
                updated_at = NOW()
            WHERE id = v_item.product_id;
        END IF;
    END LOOP;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_erp_sales_inventory_restore ON public.erp_sales;
CREATE TRIGGER trg_erp_sales_inventory_restore
BEFORE DELETE ON public.erp_sales
FOR EACH ROW
EXECUTE FUNCTION trg_fn_erp_sales_inventory_restore();
