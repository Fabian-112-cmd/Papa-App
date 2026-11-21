-- In Supabase > SQL Editor einmalig ausführen.
-- Privater Bucket: niemals auf public=true setzen.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('papa-private-documents','papa-private-documents',false,15728640,
 array['application/pdf','image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update set public=false,file_size_limit=15728640,
 allowed_mime_types=excluded.allowed_mime_types;

-- Mitglieder dürfen ausschließlich auf Dateien ihrer eigenen Familie zugreifen.
-- Pfadformat: family_id/kategorie/uuid__dateiname
-- papa_members muss bereits mit user_id und family_id existieren.
create policy "papa docs read" on storage.objects for select to authenticated
using (bucket_id='papa-private-documents' and exists (
 select 1 from public.papa_members m where m.user_id=(select auth.uid())
 and m.family_id::text=(storage.foldername(name))[1]));
create policy "papa docs upload" on storage.objects for insert to authenticated
with check (bucket_id='papa-private-documents' and exists (
 select 1 from public.papa_members m where m.user_id=(select auth.uid())
 and m.family_id::text=(storage.foldername(name))[1]));
create policy "papa docs delete" on storage.objects for delete to authenticated
using (bucket_id='papa-private-documents' and exists (
 select 1 from public.papa_members m where m.user_id=(select auth.uid())
 and m.family_id::text=(storage.foldername(name))[1]));
