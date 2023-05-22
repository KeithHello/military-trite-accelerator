interface ImportMetaEnv {
    VITE_HOST: string;
    VITE_PORT: string;
    VITE_USER: string;
    VITE_PASS: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}