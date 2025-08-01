PGDMP              	        |            agrodb    16.3    16.3 O    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    90830    agrodb    DATABASE     y   CREATE DATABASE agrodb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE agrodb;
                postgres    false                        3079    90831 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            &           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    90842    acciones    TABLE     �   CREATE TABLE public.acciones (
    id integer NOT NULL,
    tipo_accion character varying(255) NOT NULL,
    descripcion text NOT NULL,
    fecha timestamp with time zone DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Caracas'::text)
);
    DROP TABLE public.acciones;
       public         heap    postgres    false            �            1259    90848    acciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.acciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.acciones_id_seq;
       public          postgres    false    216            '           0    0    acciones_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.acciones_id_seq OWNED BY public.acciones.id;
          public          postgres    false    217            �            1259    90849    creditos    TABLE     k  CREATE TABLE public.creditos (
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
       public         heap    postgres    false            �            1259    90852    creditos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.creditos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.creditos_id_seq;
       public          postgres    false    218            (           0    0    creditos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.creditos_id_seq OWNED BY public.creditos.id;
          public          postgres    false    219            �            1259    90853    horticola_id_seq    SEQUENCE     y   CREATE SEQUENCE public.horticola_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.horticola_id_seq;
       public          postgres    false            �            1259    90854 	   horticola    TABLE       CREATE TABLE public.horticola (
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
       public         heap    postgres    false    220            �            1259    90860 
   municipios    TABLE     |   CREATE TABLE public.municipios (
    id_municipio integer NOT NULL,
    nombre_municipio character varying(255) NOT NULL
);
    DROP TABLE public.municipios;
       public         heap    postgres    false            �            1259    90863    municipios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.municipios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.municipios_id_seq;
       public          postgres    false    222            )           0    0    municipios_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.municipios_id_seq OWNED BY public.municipios.id_municipio;
          public          postgres    false    223            �            1259    90864 
   parroquias    TABLE     �   CREATE TABLE public.parroquias (
    id_parroquia integer NOT NULL,
    nombre_parroquia character varying(255) NOT NULL,
    municipio_id integer
);
    DROP TABLE public.parroquias;
       public         heap    postgres    false            �            1259    90867    parroquias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.parroquias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.parroquias_id_seq;
       public          postgres    false    224            *           0    0    parroquias_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.parroquias_id_seq OWNED BY public.parroquias.id_parroquia;
          public          postgres    false    225            �            1259    90868    productores    TABLE     �  CREATE TABLE public.productores (
    id integer NOT NULL,
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    cedula_productor character varying(9) NOT NULL,
    numero_telefonico character varying(12) NOT NULL,
    id_municipio integer NOT NULL,
    id_parroquia integer NOT NULL,
    sector character varying(255) NOT NULL,
    nombre_granja character varying(255) NOT NULL,
    id_rubro integer,
    id_status integer,
    fecha timestamp with time zone
);
    DROP TABLE public.productores;
       public         heap    postgres    false            �            1259    90873    productores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.productores_id_seq;
       public          postgres    false    226            +           0    0    productores_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.productores_id_seq OWNED BY public.productores.id;
          public          postgres    false    227            �            1259    90874    rubros    TABLE     g   CREATE TABLE public.rubros (
    id_rubro integer NOT NULL,
    nombre_rubro character varying(255)
);
    DROP TABLE public.rubros;
       public         heap    postgres    false            �            1259    90877    rubros_id_rubro_seq    SEQUENCE     �   CREATE SEQUENCE public.rubros_id_rubro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.rubros_id_rubro_seq;
       public          postgres    false    228            ,           0    0    rubros_id_rubro_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.rubros_id_rubro_seq OWNED BY public.rubros.id_rubro;
          public          postgres    false    229            �            1259    90878    status    TABLE     h   CREATE TABLE public.status (
    id_status integer NOT NULL,
    nombre_status character varying(20)
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    90881    status_id_status_seq    SEQUENCE     �   CREATE SEQUENCE public.status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.status_id_status_seq;
       public          postgres    false    230            -           0    0    status_id_status_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.status_id_status_seq OWNED BY public.status.id_status;
          public          postgres    false    231            �            1259    90882    tecnicos    TABLE     �   CREATE TABLE public.tecnicos (
    id_tec integer NOT NULL,
    nombres character varying(255),
    apellidos character varying(255),
    cedula character varying(8)
);
    DROP TABLE public.tecnicos;
       public         heap    postgres    false            �            1259    90887    tecnicos_id_tec_seq    SEQUENCE     �   CREATE SEQUENCE public.tecnicos_id_tec_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tecnicos_id_tec_seq;
       public          postgres    false    232            .           0    0    tecnicos_id_tec_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tecnicos_id_tec_seq OWNED BY public.tecnicos.id_tec;
          public          postgres    false    233            �            1259    90888    users    TABLE     �   CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            Q           2604    90894    acciones id    DEFAULT     j   ALTER TABLE ONLY public.acciones ALTER COLUMN id SET DEFAULT nextval('public.acciones_id_seq'::regclass);
 :   ALTER TABLE public.acciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            S           2604    90895    creditos id    DEFAULT     j   ALTER TABLE ONLY public.creditos ALTER COLUMN id SET DEFAULT nextval('public.creditos_id_seq'::regclass);
 :   ALTER TABLE public.creditos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            U           2604    90896    municipios id_municipio    DEFAULT     x   ALTER TABLE ONLY public.municipios ALTER COLUMN id_municipio SET DEFAULT nextval('public.municipios_id_seq'::regclass);
 F   ALTER TABLE public.municipios ALTER COLUMN id_municipio DROP DEFAULT;
       public          postgres    false    223    222            V           2604    90897    parroquias id_parroquia    DEFAULT     x   ALTER TABLE ONLY public.parroquias ALTER COLUMN id_parroquia SET DEFAULT nextval('public.parroquias_id_seq'::regclass);
 F   ALTER TABLE public.parroquias ALTER COLUMN id_parroquia DROP DEFAULT;
       public          postgres    false    225    224            W           2604    90898    productores id    DEFAULT     p   ALTER TABLE ONLY public.productores ALTER COLUMN id SET DEFAULT nextval('public.productores_id_seq'::regclass);
 =   ALTER TABLE public.productores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226            X           2604    90899    rubros id_rubro    DEFAULT     r   ALTER TABLE ONLY public.rubros ALTER COLUMN id_rubro SET DEFAULT nextval('public.rubros_id_rubro_seq'::regclass);
 >   ALTER TABLE public.rubros ALTER COLUMN id_rubro DROP DEFAULT;
       public          postgres    false    229    228            Y           2604    90900    status id_status    DEFAULT     t   ALTER TABLE ONLY public.status ALTER COLUMN id_status SET DEFAULT nextval('public.status_id_status_seq'::regclass);
 ?   ALTER TABLE public.status ALTER COLUMN id_status DROP DEFAULT;
       public          postgres    false    231    230            Z           2604    90901    tecnicos id_tec    DEFAULT     r   ALTER TABLE ONLY public.tecnicos ALTER COLUMN id_tec SET DEFAULT nextval('public.tecnicos_id_tec_seq'::regclass);
 >   ALTER TABLE public.tecnicos ALTER COLUMN id_tec DROP DEFAULT;
       public          postgres    false    233    232                      0    90842    acciones 
   TABLE DATA           G   COPY public.acciones (id, tipo_accion, descripcion, fecha) FROM stdin;
    public          postgres    false    216   �[                 0    90849    creditos 
   TABLE DATA           �   COPY public.creditos (id, cedula_productor, fecha, dimension_galpon, cantidad_semovientes, alimentacion_tipo, descripcion, factibilidad, id_tec) FROM stdin;
    public          postgres    false    218   �[                 0    90854 	   horticola 
   TABLE DATA           �   COPY public.horticola (id, cedula_productor, fecha, n_hectareas, n_h_sembradas, rubros_est, tipo_riego, semillas, insumos, implementos, factibilidad, id_tec) FROM stdin;
    public          postgres    false    221   �[                 0    90860 
   municipios 
   TABLE DATA           D   COPY public.municipios (id_municipio, nombre_municipio) FROM stdin;
    public          postgres    false    222   �[                 0    90864 
   parroquias 
   TABLE DATA           R   COPY public.parroquias (id_parroquia, nombre_parroquia, municipio_id) FROM stdin;
    public          postgres    false    224   �\                 0    90868    productores 
   TABLE DATA           �   COPY public.productores (id, nombres, apellidos, cedula_productor, numero_telefonico, id_municipio, id_parroquia, sector, nombre_granja, id_rubro, id_status, fecha) FROM stdin;
    public          postgres    false    226   �`                 0    90874    rubros 
   TABLE DATA           8   COPY public.rubros (id_rubro, nombre_rubro) FROM stdin;
    public          postgres    false    228   �`                 0    90878    status 
   TABLE DATA           :   COPY public.status (id_status, nombre_status) FROM stdin;
    public          postgres    false    230   >a                 0    90882    tecnicos 
   TABLE DATA           F   COPY public.tecnicos (id_tec, nombres, apellidos, cedula) FROM stdin;
    public          postgres    false    232   va                 0    90888    users 
   TABLE DATA           N   COPY public.users (user_id, user_name, user_email, user_password) FROM stdin;
    public          postgres    false    234   �a       /           0    0    acciones_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.acciones_id_seq', 66, true);
          public          postgres    false    217            0           0    0    creditos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.creditos_id_seq', 67, true);
          public          postgres    false    219            1           0    0    horticola_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.horticola_id_seq', 27, true);
          public          postgres    false    220            2           0    0    municipios_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.municipios_id_seq', 20, true);
          public          postgres    false    223            3           0    0    parroquias_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.parroquias_id_seq', 93, true);
          public          postgres    false    225            4           0    0    productores_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.productores_id_seq', 107, true);
          public          postgres    false    227            5           0    0    rubros_id_rubro_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.rubros_id_rubro_seq', 1, false);
          public          postgres    false    229            6           0    0    status_id_status_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.status_id_status_seq', 1, true);
          public          postgres    false    231            7           0    0    tecnicos_id_tec_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tecnicos_id_tec_seq', 21, true);
          public          postgres    false    233            ]           2606    90903    acciones acciones_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.acciones
    ADD CONSTRAINT acciones_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.acciones DROP CONSTRAINT acciones_pkey;
       public            postgres    false    216            _           2606    90905    creditos cedula_unique 
   CONSTRAINT     ]   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT cedula_unique UNIQUE (cedula_productor);
 @   ALTER TABLE ONLY public.creditos DROP CONSTRAINT cedula_unique;
       public            postgres    false    218            b           2606    90907    creditos creditos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT creditos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.creditos DROP CONSTRAINT creditos_pkey;
       public            postgres    false    218            d           2606    90909    creditos creditos_unique 
   CONSTRAINT     _   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT creditos_unique UNIQUE (cedula_productor);
 B   ALTER TABLE ONLY public.creditos DROP CONSTRAINT creditos_unique;
       public            postgres    false    218            f           2606    90911    horticola horticola_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT horticola_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.horticola DROP CONSTRAINT horticola_pkey;
       public            postgres    false    221            j           2606    90913    municipios municipios_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_pkey PRIMARY KEY (id_municipio);
 D   ALTER TABLE ONLY public.municipios DROP CONSTRAINT municipios_pkey;
       public            postgres    false    222            l           2606    90915    parroquias parroquias_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.parroquias
    ADD CONSTRAINT parroquias_pkey PRIMARY KEY (id_parroquia);
 D   ALTER TABLE ONLY public.parroquias DROP CONSTRAINT parroquias_pkey;
       public            postgres    false    224            n           2606    90917 ,   productores productores_cedula_productor_key 
   CONSTRAINT     s   ALTER TABLE ONLY public.productores
    ADD CONSTRAINT productores_cedula_productor_key UNIQUE (cedula_productor);
 V   ALTER TABLE ONLY public.productores DROP CONSTRAINT productores_cedula_productor_key;
       public            postgres    false    226            p           2606    90919    productores productores_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.productores
    ADD CONSTRAINT productores_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.productores DROP CONSTRAINT productores_pkey;
       public            postgres    false    226            r           2606    90921    rubros rubros_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.rubros
    ADD CONSTRAINT rubros_pkey PRIMARY KEY (id_rubro);
 <   ALTER TABLE ONLY public.rubros DROP CONSTRAINT rubros_pkey;
       public            postgres    false    228            t           2606    90923    status status_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id_status);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    230            v           2606    90925    tecnicos tecnicos_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tecnicos
    ADD CONSTRAINT tecnicos_pkey PRIMARY KEY (id_tec);
 @   ALTER TABLE ONLY public.tecnicos DROP CONSTRAINT tecnicos_pkey;
       public            postgres    false    232            h           2606    90927 !   horticola unique_cedula_productor 
   CONSTRAINT     h   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT unique_cedula_productor UNIQUE (cedula_productor);
 K   ALTER TABLE ONLY public.horticola DROP CONSTRAINT unique_cedula_productor;
       public            postgres    false    221            x           2606    90929    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    234            z           2606    90931    users users_user_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_email_key;
       public            postgres    false    234            `           1259    90932    creditos_cedula_productor_idx    INDEX     e   CREATE UNIQUE INDEX creditos_cedula_productor_idx ON public.creditos USING btree (cedula_productor);
 1   DROP INDEX public.creditos_cedula_productor_idx;
       public            postgres    false    218            |           2606    90933    horticola cedula_productorfk    FK CONSTRAINT     �   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT cedula_productorfk FOREIGN KEY (cedula_productor) REFERENCES public.productores(cedula_productor) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.horticola DROP CONSTRAINT cedula_productorfk;
       public          postgres    false    221    4718    226            {           2606    90938     creditos fk_creditos_productores    FK CONSTRAINT     �   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT fk_creditos_productores FOREIGN KEY (cedula_productor) REFERENCES public.productores(cedula_productor);
 J   ALTER TABLE ONLY public.creditos DROP CONSTRAINT fk_creditos_productores;
       public          postgres    false    4718    226    218            }           2606    90943 '   parroquias parroquias_municipio_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parroquias
    ADD CONSTRAINT parroquias_municipio_id_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipios(id_municipio);
 Q   ALTER TABLE ONLY public.parroquias DROP CONSTRAINT parroquias_municipio_id_fkey;
       public          postgres    false    224    4714    222                  x������ � �            x������ � �            x������ � �         �   x�-P�N�@�w�� �wI�PDXB	��Y�\t�k;��&e

�'܏��ٙ��h-��Z�1+!a��R��8V��'PR�9�x©B�q��u�6��Ws����T�"J�����{
��6E���c˪O�1km��pO�d�BhGPy�:���g�#�8[(�R�/�4c��R��z���W�`��8���N���zH;ӁT�îs�h�(���>�.�Ij��#��x!|�A��b�         �  x�mTMo�8=��B�`a}K��M��"��9�e,q2�RR�����CEn�������n��=�{3$g�=2Vg��#9�b���.���L�5E���r��;rE�=mL"WK�x7��D�xEagP�־�:b�DW�왚�y� �Z�a3�đx�.���]tk��g*V#�QC�Dݛ-E���ͧ8��f��Ct5����nd��"�-�m���\x���qƅ�+�O���r]��֨TǕZ=l9���Zq�Z�%������v���T�����%��0��:�(U+t��2��Ѹ{�jM�Ew�=�}�*�|_(`�{R�`T����Yyט}c�p�Z��� s�.�*ޙ �3�Q�U��wߌPI:��8�	����q~�ѵ�Y ��A��*uZ�k��{��9���n�����nl�1�J���λ�W:����>U}���"U�L�z�6��3!կ��H8S���>T$%�5 Ok���:+����B�3���7�I���8{��kuO�:/�l���·�1n|0�����&9����nQX}��9�^h�^ �g|�`m���BA}3�������T;���0&�7tP���$X,d=9��.��ڈ��WRty)T��f������Ԭ�n����	e�� �\�ͦ�Q��_�B�b�'z�u�]TG?�u�
U��������GK���`
].�%\�(�7w���|�a1�5��'��e��F7�:)����D���4x 	np٦W��� �[���L��J����:Z�/L/¡� �7�����Eܼ���\����Ż7�}Vφ>��(��+~`6v��~���U
�<�%���g�6�4޻�D6��),m��B}��x%���h�%a*L/���Q��(�T��U��K3��^%�$Ա:v/�Ǥ;#j���?KF��И�}�Ř�I�ѻm���ߴ�� E��            x������ � �         A   x��I
�@�s�c��x�D�@�� �ߪM_tq�[+�[��+�e�+.ˌn��g�>��2��         (   x�3�tt���2�p�s�t�q�2���
��qqq ��7            x������ � �            x������ � �     