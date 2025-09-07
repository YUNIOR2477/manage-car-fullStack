import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useTheme } from "./Theme-provider";

interface SidebarMenuProps {
  title: string;
  items: {
    title: string;
    icon: LucideIcon;
    items?: { title: string; url: string }[];
  }[];
}

export function SidebarMenuNav({ title, items }: SidebarMenuProps) {
  const { theme } = useTheme();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={`text-[13px] font-extrabold text-primary`}>
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`data-[state=open]:border cursor-pointer ${
                    theme !== "system"
                      ? "data-[state=open]:border-primary bg-primary/10 hover:bg-primary/20 data-[state=open]:hover:bg-primary/20 data-[state=open]:bg-primary/20 "
                      : "bg-gray-800/50 hover:bg-gray-800 data-[state=open]:border-green-500 data-[state=open]:bg-gray-800 data-[state=open]:hover:bg-gray-800"
                  }`}
                >
                  <a>
                    <item.icon
                      className={`${
                        theme !== "system"
                          ? "text-primary/90"
                          : "text-green-500"
                      }`}
                    />
                    <span className="text-primary ">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            onClick={() => {
                              localStorage.setItem("navigationTitle", title);
                            }}
                            asChild
                            className={`cursor-pointer ${
                              theme !== "system"
                                ? " hover:bg-primary/20 "
                                : "hover:bg-gray-800"
                            }`}
                          >
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
