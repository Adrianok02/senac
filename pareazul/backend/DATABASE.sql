--LISTA DE INSERTS BANCO DE DADOS
-- acesso a api local
-- localhost:8080/api/v1/cadastros

INSERT INTO public.cadastrosdb
(id, cpf, nascimento, email, nome)
VALUES(nextval('cadastrosdb_id_seq'::regclass), '06102314988', '1986-07-19', 'EMAIL@EMAIL.COM', 'JOAO');


INSERT INTO public.cadastrosdb
(id, cpf, nascimento, email, nome)
VALUES(nextval('cadastrosdb_id_seq'::regclass), '06102314989', '1986-07-19', 'EMAIL1@EMAIL.COM', 'pedro');


INSERT INTO public.cadastrosdb
(id, cpf, nascimento, email, nome)
VALUES(nextval('cadastrosdb_id_seq'::regclass), '06102314978', '1986-07-19', 'EMAIL2@EMAIL.COM', 'maria');


INSERT INTO public.cadastrosdb
(id, cpf, nascimento, email, nome)
VALUES(nextval('cadastrosdb_id_seq'::regclass), '06102314958', '1986-07-19', 'EMAIL3@EMAIL.COM', 'eliseu');


INSERT INTO public.cadastrosdb
(id, cpf, nascimento, email, nome)
VALUES(nextval('cadastrosdb_id_seq'::regclass), '06102314938', '1986-07-19', 'EMAIL4@EMAIL.COM', 'jessica');



