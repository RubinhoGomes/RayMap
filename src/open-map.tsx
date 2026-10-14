import { Action, ActionPanel, Icon, List } from "@raycast/api";

type MapNode = {
  id: string;
  title: string;
  description: string;
  icon: Icon;
  children: MapNode[];
};

const knowledgeTree: MapNode = {
  id: "computer-engineering",
  title: "Computer Engineering",
  description: "Technical knowledge and development concepts",
  icon: Icon.Terminal,
  children: [
    {
      id: "operating-systems",
      title: "Operating Systems",
      description: "Processes, threads, scheduling, and memory",
      icon: Icon.HardDrive,
      children: [
        {
          id: "processes",
          title: "Processes",
          description: "Program execution and process management",
          icon: Icon.AppWindow,
          children: [],
        },
        {
          id: "threads",
          title: "Threads",
          description: "Concurrent execution within a process",
          icon: Icon.BullsEye,
          children: [],
        },
        {
          id: "scheduling",
          title: "Scheduling",
          description: "How operating systems allocate CPU time",
          icon: Icon.Clock,
          children: [],
        },
      ],
    },
    {
      id: "computer-networks",
      title: "Computer Networks",
      description: "Protocols, addressing, and routing",
      icon: Icon.Network,
      children: [
        {
          id: "ipv4",
          title: "IPv4",
          description: "Internet Protocol version 4",
          icon: Icon.Globe,
          children: [],
        },
        {
          id: "ipv6",
          title: "IPv6",
          description: "Internet Protocol version 6",
          icon: Icon.Globe,
          children: [],
        },
        {
          id: "routing",
          title: "Routing",
          description: "Forwarding packets between networks",
          icon: Icon.Compass,
          children: [],
        },
      ],
    },
    {
      id: "programming",
      title: "Programming",
      description: "Programming languages and development tools",
      icon: Icon.Code,
      children: [
        {
          id: "c",
          title: "C",
          description: "Low-level and systems programming",
          icon: Icon.Code,
          children: [],
        },
        {
          id: "cpp",
          title: "C++",
          description: "Systems programming with modern abstractions",
          icon: Icon.Code,
          children: [],
        },
        {
          id: "typescript",
          title: "TypeScript",
          description: "Typed JavaScript for application development",
          icon: Icon.Code,
          children: [],
        },
      ],
    },
  ],
};

export default function Command() {
  return <NodeList node={knowledgeTree} />;
}

function NodeList({ node }: { node: MapNode }) {
  return (
    <List navigationTitle={node.title} searchBarPlaceholder={`Search ${node.title.toLowerCase()}...`}>
      {node.children.map((child) => (
        <List.Item
          key={child.id}
          icon={child.icon}
          title={child.title}
          subtitle={child.description}
          accessories={[
            {
              text: child.children.length === 1 ? "1 topic" : `${child.children.length} topics`,
            },
          ]}
          actions={
            <ActionPanel>
              {child.children.length > 0 && (
                <Action.Push title="Open Node" icon={Icon.ArrowRight} target={<NodeList node={child} />} />
              )}

              <Action.CopyToClipboard title="Copy Path" content={buildPath(knowledgeTree, child.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function buildPath(root: MapNode, targetId: string): string {
  const path: string[] = [];

  function visit(node: MapNode): boolean {
    path.push(node.title);

    if (node.id === targetId) {
      return true;
    }

    for (const child of node.children) {
      if (visit(child)) {
        return true;
      }
    }

    path.pop();
    return false;
  }

  visit(root);

  return path.join(" → ");
}
