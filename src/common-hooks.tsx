import { CommonHooks } from "rakkasjs";
import { MantineProvider } from "@mantine/core";
import "./globals.css";

export default {
    wrapApp(app) {
        return <MantineProvider>{app}</MantineProvider>
    }
} satisfies CommonHooks;