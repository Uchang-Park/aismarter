CREATE TABLE public.trial_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 320),
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.trial_requests TO service_role;

ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX trial_requests_created_at_idx ON public.trial_requests (created_at DESC);