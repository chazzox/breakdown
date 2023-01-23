import "@auth/core";
import "@auth/core/jwt";

declare module "@auth/core/types" {
    interface Session {
        access_token?: string;
        refresh_token?: string;
        expires?: string;
    }

    interface Account {
        expires?: string;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        access_token?: string;
        refresh_token?: string;
        expires?: string;
    }
}
