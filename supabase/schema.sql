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
