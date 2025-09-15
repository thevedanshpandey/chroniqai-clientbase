-- Insert client credentials and sheet URLs
INSERT INTO public.clients (username, password_hash, client_name, sheet_url) VALUES
('Takshit', 'Takshit@22', 'DharatalAI', 'https://docs.google.com/spreadsheets/d/1tXjPjFEeXe35ZnNO8Npg37N_pqpIeRVrMrfGxK_zUA4/export?format=csv'),
('Mercato', 'Mercato@22', 'Mercato Agency', 'https://docs.google.com/spreadsheets/d/1hYNo96-rfZ0FcsG-MzLq0t34R3SPlZ5t6rVYDsQcbjI/export?format=csv'),
('Danish', 'Danish@22', 'Danish', 'https://docs.google.com/spreadsheets/d/1T8NN-FpvbuahWnxA99xc8sPVaB2cPoSjlk3CadCJKtU/export?format=csv')
ON CONFLICT (username) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  client_name = EXCLUDED.client_name,
  sheet_url = EXCLUDED.sheet_url;