PGDMP  4                     |            agrodb    16.0    16.0 4    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    agrodb    DATABASE     y   CREATE DATABASE agrodb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE agrodb;
                postgres    false                        3079    16497 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16400    creditos    TABLE     k  CREATE TABLE public.creditos (
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
       public         heap    postgres    false            �            1259    16399    creditos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.creditos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.creditos_id_seq;
       public          postgres    false    217                        0    0    creditos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.creditos_id_seq OWNED BY public.creditos.id;
          public          postgres    false    216            �            1259    16527    horticola_id_seq    SEQUENCE     y   CREATE SEQUENCE public.horticola_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.horticola_id_seq;
       public          postgres    false            �            1259    16415 	   horticola    TABLE       CREATE TABLE public.horticola (
    id integer DEFAULT nextval('public.horticola_id_seq'::regclass) NOT NULL,
    cedula_productor character(8) NOT NULL,
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
       public         heap    postgres    false    228            �            1259    16407    productores    TABLE     �  CREATE TABLE public.productores (
    id integer NOT NULL,
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    cedula_productor character(8) NOT NULL,
    numero_telefonico character(11) NOT NULL,
    municipio character varying(255) NOT NULL,
    parroquia character varying(255) NOT NULL,
    sector character varying(255) NOT NULL,
    nombre_granja character varying(255) NOT NULL,
    id_rubro integer,
    id_status integer
);
    DROP TABLE public.productores;
       public         heap    postgres    false            �            1259    16406    productores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.productores_id_seq;
       public          postgres    false    219                       0    0    productores_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.productores_id_seq OWNED BY public.productores.id;
          public          postgres    false    218            �            1259    16423    rubros    TABLE     g   CREATE TABLE public.rubros (
    id_rubro integer NOT NULL,
    nombre_rubro character varying(255)
);
    DROP TABLE public.rubros;
       public         heap    postgres    false            �            1259    16422    rubros_id_rubro_seq    SEQUENCE     �   CREATE SEQUENCE public.rubros_id_rubro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.rubros_id_rubro_seq;
       public          postgres    false    222                       0    0    rubros_id_rubro_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.rubros_id_rubro_seq OWNED BY public.rubros.id_rubro;
          public          postgres    false    221            �            1259    16430    status    TABLE     h   CREATE TABLE public.status (
    id_status integer NOT NULL,
    nombre_status character varying(20)
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    16429    status_id_status_seq    SEQUENCE     �   CREATE SEQUENCE public.status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.status_id_status_seq;
       public          postgres    false    224                       0    0    status_id_status_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.status_id_status_seq OWNED BY public.status.id_status;
          public          postgres    false    223            �            1259    16437    tecnicos    TABLE     �   CREATE TABLE public.tecnicos (
    id_tec integer NOT NULL,
    nombres character varying(255),
    apellidos character varying(255),
    cedula character(8)
);
    DROP TABLE public.tecnicos;
       public         heap    postgres    false            �            1259    16436    tecnicos_id_tec_seq    SEQUENCE     �   CREATE SEQUENCE public.tecnicos_id_tec_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tecnicos_id_tec_seq;
       public          postgres    false    226                       0    0    tecnicos_id_tec_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tecnicos_id_tec_seq OWNED BY public.tecnicos.id_tec;
          public          postgres    false    225            �            1259    16508    users    TABLE     �   CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            B           2604    16403    creditos id    DEFAULT     j   ALTER TABLE ONLY public.creditos ALTER COLUMN id SET DEFAULT nextval('public.creditos_id_seq'::regclass);
 :   ALTER TABLE public.creditos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            C           2604    16410    productores id    DEFAULT     p   ALTER TABLE ONLY public.productores ALTER COLUMN id SET DEFAULT nextval('public.productores_id_seq'::regclass);
 =   ALTER TABLE public.productores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            E           2604    16426    rubros id_rubro    DEFAULT     r   ALTER TABLE ONLY public.rubros ALTER COLUMN id_rubro SET DEFAULT nextval('public.rubros_id_rubro_seq'::regclass);
 >   ALTER TABLE public.rubros ALTER COLUMN id_rubro DROP DEFAULT;
       public          postgres    false    222    221    222            F           2604    16433    status id_status    DEFAULT     t   ALTER TABLE ONLY public.status ALTER COLUMN id_status SET DEFAULT nextval('public.status_id_status_seq'::regclass);
 ?   ALTER TABLE public.status ALTER COLUMN id_status DROP DEFAULT;
       public          postgres    false    223    224    224            G           2604    16440    tecnicos id_tec    DEFAULT     r   ALTER TABLE ONLY public.tecnicos ALTER COLUMN id_tec SET DEFAULT nextval('public.tecnicos_id_tec_seq'::regclass);
 >   ALTER TABLE public.tecnicos ALTER COLUMN id_tec DROP DEFAULT;
       public          postgres    false    225    226    226            �          0    16400    creditos 
   TABLE DATA           �   COPY public.creditos (id, cedula_productor, fecha, dimension_galpon, cantidad_semovientes, alimentacion_tipo, descripcion, factibilidad, id_tec) FROM stdin;
    public          postgres    false    217   �;       �          0    16415 	   horticola 
   TABLE DATA           �   COPY public.horticola (id, cedula_productor, fecha, n_hectareas, n_h_sembradas, rubros_est, tipo_riego, semillas, insumos, implementos, factibilidad, id_tec) FROM stdin;
    public          postgres    false    220   �;       �          0    16407    productores 
   TABLE DATA           �   COPY public.productores (id, nombres, apellidos, cedula_productor, numero_telefonico, municipio, parroquia, sector, nombre_granja, id_rubro, id_status) FROM stdin;
    public          postgres    false    219   |<       �          0    16423    rubros 
   TABLE DATA           8   COPY public.rubros (id_rubro, nombre_rubro) FROM stdin;
    public          postgres    false    222   �<       �          0    16430    status 
   TABLE DATA           :   COPY public.status (id_status, nombre_status) FROM stdin;
    public          postgres    false    224   �<       �          0    16437    tecnicos 
   TABLE DATA           F   COPY public.tecnicos (id_tec, nombres, apellidos, cedula) FROM stdin;
    public          postgres    false    226   "=       �          0    16508    users 
   TABLE DATA           N   COPY public.users (user_id, user_name, user_email, user_password) FROM stdin;
    public          postgres    false    227   S=                  0    0    creditos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.creditos_id_seq', 17, true);
          public          postgres    false    216                       0    0    horticola_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.horticola_id_seq', 19, true);
          public          postgres    false    228                       0    0    productores_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.productores_id_seq', 49, true);
          public          postgres    false    218                       0    0    rubros_id_rubro_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.rubros_id_rubro_seq', 1, false);
          public          postgres    false    221            	           0    0    status_id_status_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.status_id_status_seq', 1, true);
          public          postgres    false    223            
           0    0    tecnicos_id_tec_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tecnicos_id_tec_seq', 1, false);
          public          postgres    false    225            J           2606    16405    creditos creditos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.creditos
    ADD CONSTRAINT creditos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.creditos DROP CONSTRAINT creditos_pkey;
       public            postgres    false    217            P           2606    16526    horticola horticola_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT horticola_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.horticola DROP CONSTRAINT horticola_pkey;
       public            postgres    false    220            L           2606    16448 ,   productores productores_cedula_productor_key 
   CONSTRAINT     s   ALTER TABLE ONLY public.productores
    ADD CONSTRAINT productores_cedula_productor_key UNIQUE (cedula_productor);
 V   ALTER TABLE ONLY public.productores DROP CONSTRAINT productores_cedula_productor_key;
       public            postgres    false    219            N           2606    16414    productores productores_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.productores
    ADD CONSTRAINT productores_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.productores DROP CONSTRAINT productores_pkey;
       public            postgres    false    219            T           2606    16428    rubros rubros_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.rubros
    ADD CONSTRAINT rubros_pkey PRIMARY KEY (id_rubro);
 <   ALTER TABLE ONLY public.rubros DROP CONSTRAINT rubros_pkey;
       public            postgres    false    222            V           2606    16435    status status_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id_status);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    224            X           2606    16444    tecnicos tecnicos_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tecnicos
    ADD CONSTRAINT tecnicos_pkey PRIMARY KEY (id_tec);
 @   ALTER TABLE ONLY public.tecnicos DROP CONSTRAINT tecnicos_pkey;
       public            postgres    false    226            R           2606    16532 !   horticola unique_cedula_productor 
   CONSTRAINT     h   ALTER TABLE ONLY public.horticola
    ADD CONSTRAINT unique_cedula_productor UNIQUE (cedula_productor);
 K   ALTER TABLE ONLY public.horticola DROP CONSTRAINT unique_cedula_productor;
       public            postgres    false    220            Z           2606    16515    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    227            \           2606    16517    users users_user_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_email_key;
       public            postgres    false    227            �      x������ � �      �   �   x�M�1�0 g�~@AI�е��,VkE��%��'^��@� �t���۷�c�Ǹ��-���\�$��pR|h���
7�%g�81ο�_�w:q1ɲ�b\�p5e�
C�Ѵ4���l�ݷι7�.V      �      x������ � �      �   A   x��I
�@�s�c�{&�´����aՈ�7�8���qƥz��2��eF7n�v�H���      �   (   x�3�tt���2�p�s�t�q�2���
��qqq ��7      �   !   x�3������t�O�4�045126����� N�E      �   z  x�m��v�0F���
KBH���4L��d#���׉1y�rZ�Y�|�{���F��hjS@�@�Va[b�If�E��N��Eu���6X,\��y�����΍`��?�����6�Z�M����q���}���!v�2���A�"gl�b�P��3�nkE �Bܐ�{{K�<�W�N�_c��y}Q=��+�\�f��b���k�L�~7V�36g�b|���
���m)�L��Y1*�2��4�{�%N]�G`��:\�i��i�"����������?��\H�+?\Ox�Ǽ����{I�f&��	ˀ������0 u�u��tl۳���7ݙSOn�����m�����>�x7O4�h���t���,�Gꥎ��7�4Ϳ����     