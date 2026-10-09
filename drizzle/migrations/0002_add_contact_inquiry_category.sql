ALTER TABLE public.contact_inquiries
  ADD COLUMN source text NOT NULL DEFAULT 'email-modal' CHECK (source IN ('email-modal', 'consultation-form')),
  ADD COLUMN category text CHECK (category IN ('adoption', 'partnership', 'advertising', 'other'));

CREATE INDEX contact_inquiries_source_idx ON public.contact_inquiries (source, created_at DESC);
