PGDMP                      |            agrodb    16.2    16.2 8               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    agrodb    DATABASE     y   CREATE DATABASE agrodb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE agrodb;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    16400    creditos    TABLE     k  CREATE TABLE public.creditos (
    id integer NOT NULL,
    cedula_productor character varying(8) NOT NULL,
    fecha date,
    dimension_galpon character varying(40),
    cantidad_semovientes character varying(25),
    alimentacion_tipo character varying(255),
    descripcion character varying(50),
    factibilidad character varying(50),
    id_tec integer
);
    DROP TABLE public.creditos;
       public         heap    postgres    false    5            �            1259    16399    creditos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.creditos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.creditos_id_seq;
       public          postgres    false    217    5                       0    0    creditos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.creditos_id_seq OWNED BY public.creditos.id;
          public          postgres    false    216            �            1259    16527    horticola_id_seq    SEQUENCE     y   CREATE SEQUENCE public.horticola_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.horticola_id_seq;
       public          postgres    false    5            �            1259    16415 	   horticola    TABLE       CREATE TABLE public.horticola (
    id integer DEFAULT nextval('public.horticola_id_seq'::regclass) NOT NULL,
    cedula_productor character varying(8) NOT NULL,
    fecha date,
    n_hectareas character varying(255),
    n_h_sembradas character varying(255),
    rubros_est character varying(255),
    tipo_riego character varying(255),
    semillas character varying(255),
    insumos character varying(255),
    implementos character varying(255),
    factibilidad character varying(255),
    id_tec integer NOT NULL
);
    DROP TABLE public.horticola;
       public         heap    postgres    false    228    5            �            1259    16407    productores    TABLE     �  CREATE TABLE public.productores (
    id integer NOT NULL,
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    cedula_productor character varying(8) NOT NULL,
    numero_telefonico character varying(11) NOT NULL,
    municipio character varying(255) NOT NULL,
    parroquia character varying(255) NOT NULL,
    sector character varying(255) NOT NULL,
    nombre_granja character varying(255) NOT NULL,
    id_rubro integer,
    id_status integer
);
    DROP TABLE public.productores;
       public         heap    postgres    false    5            �            1259    16406    productores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.productores_id_seq;
       public          postgres    false    219    5                       0    0    productores_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.productores_id_seq OWNED BY public.productores.id;
          public          postgres    false    218            �            1259    16423    rubros    TABLE     g   CREATE TABLE public.rubros (
    id_rubro integer NOT NULL,
    nombre_rubro character varying(255)
);
    DROP TABLE public.rubros;
       public         heap    postgres    false    5            �            1259    16422    rubros_id_rubro_seq    SEQUENCE     �   CREATE SEQUENCE public.rubros_id_rubro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.rubros_id_rubro_seq;
       public          postgres    false    5    222                       0    0    rubros_id_rubro_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.rubros_id_rubro_seq OWNED BY public.rubros.id_rubro;
          public          postgres    false    221            �            1259    16430    status    TABLE     h   CREATE TABLE public.status (
    id_status integer NOT NULL,
    nombre_status character varying(20)
);
    DROP TABLE public.status;
       public         heap    postgres    false    5            �            1259    16429    status_id_status_seq    SEQUENCE     �   CREATE SEQUENCE public.status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.status_id_status_seq;
       public          postgres    false    224    5            	           0    0    status_id_status_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.status_id_status_seq OWNED BY public.status.id_status;
          public          postgres    false    223            �            1259    16437    tecnicos    TABLE     �   CREATE TABLE public.tecnicos (
    id_tec integer NOT NULL,
    nombres character varying(255),
    apellidos character varying(255),
    cedula character varying(8)
);
    DROP TABLE public.tecnicos;
       public         heap    postgres    false    5            �            1259    16436    tecnicos_id_tec_seq    SEQUENCE     �   CREATE SEQUENCE public.tecnicos_id_tec_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tecnicos_id_tec_seq;
       public          postgres    false    226    5            
           0    0    tecnicos_id_tec_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tecnicos_id_tec_seq OWNED BY public.tecnicos.id_tec;
          public          postgres    false    225            �            1259    16508    users    TABLE     �   CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    5    5    5            B           2604    16403    creditos id    DEFAULT     j   ALTER TABLE ONLY public.creditos ALTER COLUMN id SET DEFAULT nextval('public.creditos_id_seq'::regclass);
 :   ALTER TABLE public.creditos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            C           2604    16410    productores id    DEFAULT     p   ALTER TABLE ONLY public.productores ALTER COLUMN id SET DEFAULT nextval('public.productores_id_seq'::regclass);
 =   ALTER TABLE public.productores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            E           2604    16426    rubros id_rubro    DEFAULT     r   ALTER TABLE ONLY public.rubros ALTER COLUMN id_rubro SET DEFAULT nextval('public.rubros_id_rubro_seq'::regclass);
 >   ALTER TABLE public.rubros ALTER COLUMN id_rubro DROP DEFAULT;
       public          postgres    false    221    222    222            F           2604    16433    status id_status    DEFAULT     t   ALTER TABLE ONLY public.status ALTER COLUMN id_status SET DEFAULT nextval('public.status_id_status_seq'::regclass);
 ?   ALTER TABLE public.status ALTER COLUMN id_status DROP DEFAULT;
       public          postgres    false    223    224    224            G           2604    16440    tecnicos id_tec    DEFAULT     r   ALTER TABLE ONLY public.tecnicos ALTER COLUMN id_tec SET DEFAULT nextval('public.tecnicos_id_tec_seq'::regclass);
 >   ALTER TABLE public.tecnicos ALTER COLUMN id_tec DROP DEFAULT;
       public          postgres    false    225    226    226            �          0    16400    creditos 
   TABLE DATA           �   COPY public.creditos (id, cedula_productor, fecha, dimension_galpon, cantidad_semovientes, alimentacion_tipo, descripcion, factibilidad, id_tec) FROM stdin;
    public          postgres    false    217   bA       �          0    16415 	   horticola 
   TABLE DATA           �   COPY public.horticola (id, cedula_productor, fecha, n_hectareas, n_h_sembradas, rubros_est, tipo_riego, semillas, insumos, implementos, factibilidad, id_tec) FROM stdin;
    public          postgres    false    220   �A       �          0    16407    productores 
   TABLE DATA           �   COPY public.productores (id, nombres, apellidos, cedula_productor, numero_telefonico, municipio, parroquia, sector, nombre_granja, id_rubro, id_status) FROM stdin;
    public          postgres    false    219   :B       �          0    16423    rubros 
   TABLE DATA           8   COPY public.rubros (id_rubro, nombre_rubro) FROM stdin;
    public          postgres    false    222   �B       �          0    16430    status 
   TABLE DATA           :   COPY public.status (id_status, nombre_status) FROM stdin;
    public          postgres    false    224   )C       �          0    16437    tecnicos 
   TABLE DATA           F   COPY public.tecnicos (id_tec, nombres, apellidos, cedula) FROM stdin;
    public          postgres    false    226   aC       �          0    16508    users 
   TABLE DATA           N   COPY public.users (user_id, user_name, user_email, user_password) FROM stdin;
    public          postgres    false    227   �C                  0    0    creditos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.creditos_id_seq', 57, true);
          public          postgres    false    216                       0    0    horticola_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.horticola_id_seq', 24, true);
          public          postgres    false    228                       0    0    productores_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.productores_id_seq', 62, true);
          public          postgres    false    218                       0    0    rubros_id_rubro_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.rubros_id_rubro_seq', 1, false);
          public          postgres    false    221                       0    0    status_id_status_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.status_id_status_seq', 1, true);
          public          postgres    false    223                       0    0    tecnicos_id_tec_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tecnicos_id_tec_seq', 1, false);
          public          postgres    false    225            J           2606    24718    creditos cedula_unique 
   CONSTRAINT     ]   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT cedula_unique UNIQUE (cedula_productor);
 @   ALTER TABLE ONLY public.creditos DROP CONSTRAINT cedula_unique;
       public            postgres    false    217            M           2606    16405    creditos creditos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT creditos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.creditos DROP CONSTRAINT creditos_pkey;
       public            postgres    false    217            O           2606    24720    creditos creditos_unique 
   CONSTRAINT     _   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT creditos_unique UNIQUE (cedula_productor);
 B   ALTER TABLE ONLY public.creditos DROP CONSTRAINT creditos_unique;
       public            postgres    false    217            U           2606    16526    horticola horticola_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT horticola_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.horticola DROP CONSTRAINT horticola_pkey;
       public            postgres    false    220            Q           2606    24723 ,   productores productores_cedula_productor_key 
   CONSTRAINT     s   ALTER TABLE ONLY public.productores
    ADD CONSTRAINT productores_cedula_productor_key UNIQUE (cedula_productor);
 V   ALTER TABLE ONLY public.productores DROP CONSTRAINT productores_cedula_productor_key;
       public            postgres    false    219            S           2606    16414    productores productores_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.productores
    ADD CONSTRAINT productores_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.productores DROP CONSTRAINT productores_pkey;
       public            postgres    false    219            Y           2606    16428    rubros rubros_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.rubros
    ADD CONSTRAINT rubros_pkey PRIMARY KEY (id_rubro);
 <   ALTER TABLE ONLY public.rubros DROP CONSTRAINT rubros_pkey;
       public            postgres    false    222            [           2606    16435    status status_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id_status);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    224            ]           2606    16444    tecnicos tecnicos_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tecnicos
    ADD CONSTRAINT tecnicos_pkey PRIMARY KEY (id_tec);
 @   ALTER TABLE ONLY public.tecnicos DROP CONSTRAINT tecnicos_pkey;
       public            postgres    false    226            W           2606    24773 !   horticola unique_cedula_productor 
   CONSTRAINT     h   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT unique_cedula_productor UNIQUE (cedula_productor);
 K   ALTER TABLE ONLY public.horticola DROP CONSTRAINT unique_cedula_productor;
       public            postgres    false    220            _           2606    16515    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    227            a           2606    16517    users users_user_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_email_key;
       public            postgres    false    227            K           1259    24721    creditos_cedula_productor_idx    INDEX     e   CREATE UNIQUE INDEX creditos_cedula_productor_idx ON public.creditos USING btree (cedula_productor);
 1   DROP INDEX public.creditos_cedula_productor_idx;
       public            postgres    false    217            b           2606    24781     creditos fk_creditos_productores    FK CONSTRAINT     �   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT fk_creditos_productores FOREIGN KEY (cedula_productor) REFERENCES public.productores(cedula_productor) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.creditos DROP CONSTRAINT fk_creditos_productores;
       public          postgres    false    217    4689    219            �   l   x�E�A!���)�����4$�5a4_&������9B�l��E��(�0���S�R�q�w����ș9�����s=��z+��jju4���`��      �   L   x�32�460410�4�4202�50�52��4��M̬�L�/I͇0�2��K��aδ��̤�T===NC�=... �P      �   �   x���A
�0���9A�hLt9� �8�)����hp�]w����ण�j=KR�if{H-L0:�..�|D?��K�^jX���J�w��_Z.������F��̖�.�l���Ĺؑ8E���$l�F|��1���0       �   A   x��I
�@�s�c��x�D�@�� �ߪM_tq�[+�[��+�e�+.ˌn��g�>��2��      �   (   x�3�tt���2�p�s�t�q�2���
��qqq ��7      �   ;   x�3������t�O�4�045126�2�8�075'�ӯ����*NC#cS3s�=... pW�      �     x�m�K{�0���;�&!$awD�V�K�=g����������<��fv��͌�J4��P�´ �0�;kN��Y�W}x�?i.�����/��ɹk�x���#.�7f�(ݕjw��x�U׺�����U�g��d%.B�p�� ��N[<#�1�@h�x ���1�*����iX�>���r��h�|rO0izS��b$�r��V�:?��R4�k�R�i)������Fw���e�+-��K`��=��f��E�"��w���ˍW��:(n$}S��7A�NA��ֳ��Ha��Bm !��?"H��Q�I�ŝ��D�';s��/����|Z��
B�4�x'sRT��|��BO��:X�2�\�*�a<�Q�H	ۻ{(���0���������;��J}����*��F���m��&e���JB�C�.���~��7�X������ߌ����)�B��_"z�g�,M�������{��xt�����
�(�i�
�x%��z��.�yn��-��ؔ�     