import {
    AppShell,
    Box,
    Burger,
    Container,
    Divider,
    Group,
    UnstyledButton,
    Text,
  } from "@mantine/core";
  import { useDisclosure } from "@mantine/hooks";
  import { Link, useLocation } from "rakkasjs";
  import { useState } from "react";
  
  interface ShellLink {
    label: string;
    href: string;
  }
  
  export const SHELL_LINKS: ShellLink[] = [
    { label: "Home", href: "/" },
    {
      label: "Test CLICK HERE",
      href: "/test",
    },
    {
      label: "Test2",
      href: "/events",
    },
    {
      label: "Test3",
      href: "/maps",
    },
  ];
  
  const ACTIVE_BG_DARK_VAR = "--_active-link-dark-bg" as const;
  const ACTIVE_BG_LIGHT_VAR = "--_active-link-light-bg" as const;
  
  const ACTIVE_COLOR_DARK_VAR = "--_active-link-dark-color" as const;
  const ACTIVE_COLOR_LIGHT_VAR = "--_active-link-light-color" as const;
  
  const LIGHT_BG_COLORS = {
    textColor: "#228be6",
    bgColor: "rgba(231, 245, 255, 1)",
  } as const;
  
  const DARK_BG_COLORS = {
    textColor: "#a5d8ff",
    bgColor: "rgba(25, 113, 194, 0.2)",
  } as const;
  
  export function Shell({ children }: React.PropsWithChildren) {
    const location = useLocation();
  
    const [opened, { toggle, close }] = useDisclosure();
    const [activeLink, setActiveLink] = useState(location.current.pathname);
  
    const shouldSetActiveClass = (link: string) => {
      if (link === "/") {
        return activeLink === "/";
      }
      return activeLink.startsWith(link);
    };
  
    const handleClick = (link: string) => {
      setActiveLink(link);
      close();
    };
  
    const mobileLinks = SHELL_LINKS.map((link) => (
      <UnstyledButton
        component={Link}
        key={link.href}
        style={{
          // @ts-expect-error mantine style type cant handle css vars
          "--_active-link-dark-bg": DARK_BG_COLORS.bgColor,
          "--_active-link-light-bg": LIGHT_BG_COLORS.bgColor,
          "--_active-link-dark-color": DARK_BG_COLORS.textColor,
          "--_active-link-light-color": LIGHT_BG_COLORS.textColor,
        }}
        href={link.href}
        onClick={() => handleClick(link.href)}
        {...(shouldSetActiveClass(link.href) ? { "data-active": true } : {})}
      >
        {link.label}
      </UnstyledButton>
    ));
  
    const desktopLinks = SHELL_LINKS.map((link) => (
      <UnstyledButton
        component={Link}
        key={link.href}
        style={{
          // @ts-expect-error mantine style type cant handle css vars
          "--_active-link-dark-bg": DARK_BG_COLORS.bgColor,
          "--_active-link-light-bg": LIGHT_BG_COLORS.bgColor,
          "--_active-link-dark-color": DARK_BG_COLORS.textColor,
          "--_active-link-light-color": LIGHT_BG_COLORS.textColor,
        }}
        href={link.href}
        onClick={() => handleClick(link.href)}
        {...(shouldSetActiveClass(link.href) ? { "data-active": true } : {})}
      >
        {link.label}
      </UnstyledButton>
    ));
  
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          {/** Desktop and Tablet Header */}
          <Container size="lg" visibleFrom="xs">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Group
                ml={{ xs: "xs" }}
                wrap="nowrap"
                gap="xs"
                style={{ whiteSpace: "nowrap" }}
              >
                <Text fw="bold" fz="md">
                  Hello
                </Text>
              </Group>
              <Group ml="xl" gap="xs" visibleFrom="sm">
                {desktopLinks}
              </Group>
              <Group gap={14} style={{ justifyContent: "flex-end" }}>
                {/* <ColorSchemeToggle /> */}
              </Group>
            </Group>
          </Container>
          {/** Mobile Header */}
          <Box
            style={{
              alignItems: "center",
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
              paddingLeft: "5",
              paddingRight: "5",
            }}
            hiddenFrom="xs"
          >
            <Burger
              opened={opened}
              size="sm"
              onClick={toggle}
              aria-label="Toggle navbar"
            />
            <div
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Group style={{ gap: "0.5rem" }}>
                <Text fw="bold" fz="md">
                  Hello
                </Text>
              </Group>
            </div>
            {/* <ColorSchemeToggle /> */}
          </Box>
        </AppShell.Header>
  
        <AppShell.Navbar py="md">
          <AppShell.Section mb="xs" ml="xs">
            Navigation
          </AppShell.Section>
          <Divider />
  
          {mobileLinks}
        </AppShell.Navbar>
  
        <AppShell.Main>
          <Container size="lg">{children}</Container>
        </AppShell.Main>
      </AppShell>
    );
  }
  