CREATE TABLE creditos (
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

CREATE TABLE horticola (
    id integer NOT NULL,
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

CREATE TABLE productores (
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

CREATE TABLE rubros (
    id_rubro integer NOT NULL,
    nombre_rubro character varying(255)
);

CREATE TABLE status (
    id_status integer NOT NULL,
    nombre_status character varying(20)
);

CREATE TABLE tecnicos (
    id_tec integer NOT NULL,
    nombres character varying(255),
    apellidos character varying(255),
    cedula character(8)
);

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);