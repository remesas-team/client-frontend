export interface User {
  id: number;
  name: string;
  last_name: string;
  phone_code: string;
  phone: string;
  email: string;
  birth_date: string;
  doc_type_id: number;
  user_status_id: number;
  doc_value: string;
  is_pep: number;
  is_pep_familiar: number;
  occupation_id: number;
  genre: string;
  proof_residence: string | null;
  civil_status: string;
  address: string;
  geo_district_id: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}