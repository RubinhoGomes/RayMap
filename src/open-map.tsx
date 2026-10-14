import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api";

type MapNode = {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  links: {
    title: string;
    url: string;
  }[];
  icon: Icon;
  children: MapNode[];
};

const knowledgeTree: MapNode = {
  id: "computer-engineering",
  title: "Computer Engineering",
  description: "Technical knowledge and development concepts",
  content: `
# Computer Engineering

A structured knowledge tree for organising technical concepts, projects, tools, and ideas.

Use the child nodes to explore different areas of computer engineering.
`,
  tags: ["engineering", "technology"],
  links: [],
  icon: Icon.Terminal,
  children: [
    {
      id: "operating-systems",
      title: "Operating Systems",
      description: "Processes, threads, scheduling, and memory",
      content: `
# Operating Systems

An operating system manages the hardware and software resources of a computer.

Important topics include:

- Processes
- Threads
- Scheduling
- Memory management
- File systems
- Input and output

Operating systems provide abstractions that allow applications to use hardware without managing every hardware detail directly.
`,
      tags: ["operating-systems", "systems-programming"],
      links: [
        {
          title: "Operating Systems - Wikipedia",
          url: "https://en.wikipedia.org/wiki/Operating_system",
        },
      ],
      icon: Icon.HardDrive,
      children: [
        {
          id: "processes",
          title: "Processes",
          description: "Program execution and process management",
          content: `
# Processes

A process is a program in execution.

A process usually contains:

- Its own virtual address space
- Program instructions
- Stack and heap memory
- Open file descriptors
- One or more threads

The operating system isolates processes from one another and manages their access to system resources.
`,
          tags: ["processes", "operating-systems"],
          links: [
            {
              title: "Linux Process Overview",
              url: "https://man7.org/linux/man-pages/man5/proc.5.html",
            },
          ],
          icon: Icon.AppWindow,
          children: [],
        },
        {
          id: "threads",
          title: "Threads",
          description: "Concurrent execution units within a process",
          content: `
# Threads

A thread is the smallest unit of execution within a process.

Threads belonging to the same process share:

- Heap memory
- Global variables
- Open file descriptors

Each thread has its own:

- Stack
- Program counter
- Registers

In POSIX systems, threads can be created and managed using the pthreads API.

Shared memory makes communication between threads efficient, but it also introduces the possibility of race conditions and data races.
`,
          tags: ["threads", "concurrency", "POSIX"],
          links: [
            {
              title: "POSIX Threads - Linux manual",
              url: "https://man7.org/linux/man-pages/man7/pthreads.7.html",
            },
          ],
          icon: Icon.Person,
          children: [],
        },
        {
          id: "scheduling",
          title: "Scheduling",
          description: "How operating systems allocate CPU time",
          content: `
# Scheduling

CPU scheduling determines which runnable thread or process receives processor time.

A scheduler may consider:

- Priority
- Fairness
- Response time
- Throughput
- Waiting time

The goal depends on the system. A desktop operating system may prioritise responsiveness, while a real-time system may prioritise predictable deadlines.
`,
          tags: ["scheduling", "operating-systems"],
          links: [],
          icon: Icon.Clock,
          children: [],
        },
      ],
    },
    {
      id: "computer-networks",
      title: "Computer Networks",
      description: "Protocols, addressing, and routing",
      content: `
# Computer Networks

Computer networking is the study of how devices communicate and exchange data.

Important topics include:

- Addressing
- Routing
- Transport protocols
- Network architectures
- Reliability
- Security
`,
      tags: ["networks", "communication"],
      links: [],
      icon: Icon.Network,
      children: [
        {
          id: "ipv4",
          title: "IPv4",
          description: "Internet Protocol version 4",
          content: `
# IPv4

IPv4 uses 32-bit addresses, usually written in dotted-decimal notation.

Example:

\`192.168.1.10\`

An IPv4 address is divided into a network portion and a host portion. Subnet masks determine how those portions are separated.
`,
          tags: ["IPv4", "addressing", "networking"],
          links: [],
          icon: Icon.Globe,
          children: [],
        },
        {
          id: "ipv6",
          title: "IPv6",
          description: "Internet Protocol version 6",
          content: `
# IPv6

IPv6 uses 128-bit addresses and was designed to solve the address exhaustion problem of IPv4.

Example:

\`2001:db8::1\`

IPv6 also includes improvements to address configuration, routing, and protocol extensibility.
`,
          tags: ["IPv6", "addressing", "networking"],
          links: [],
          icon: Icon.Globe,
          children: [],
        },
        {
          id: "routing",
          title: "Routing",
          description: "Forwarding packets between networks",
          content: `
# Routing

Routing is the process of selecting paths for packets to travel between networks.

Routers use routing tables to decide where packets should be forwarded.

Routing may be:

- Static
- Dynamic
- Interior gateway routing
- Exterior gateway routing
`,
          tags: ["routing", "networking"],
          links: [],
          icon: Icon.Compass,
          children: [],
        },
      ],
    },
    {
      id: "programming",
      title: "Programming",
      description: "Programming languages and development tools",
      content: `
# Programming

Programming involves designing algorithms and writing instructions that computers can execute.

Different languages provide different abstractions, performance characteristics, and development ecosystems.
`,
      tags: ["programming", "software-development"],
      links: [],
      icon: Icon.Code,
      children: [
        {
          id: "c",
          title: "C",
          description: "Low-level and systems programming",
          content: `
# C

C is a procedural programming language commonly used for operating systems, embedded systems, compilers, and performance-sensitive software.

Important concepts include:

- Pointers
- Manual memory management
- Structs
- Function pointers
- Undefined behaviour
- Compilation and linking
`,
          tags: ["C", "systems-programming"],
          links: [],
          icon: Icon.Code,
          children: [],
        },
        {
          id: "cpp",
          title: "C++",
          description: "Systems programming with modern abstractions",
          content: `
# C++

C++ combines low-level control with higher-level abstractions.

Important concepts include:

- RAII
- Templates
- Move semantics
- Smart pointers
- Object-oriented programming
- Generic programming
`,
          tags: ["C++", "systems-programming"],
          links: [],
          icon: Icon.Code,
          children: [],
        },
        {
          id: "typescript",
          title: "TypeScript",
          description: "Typed JavaScript for application development",
          content: `
# TypeScript

TypeScript is a statically typed superset of JavaScript.

It adds features such as:

- Static type checking
- Interfaces
- Generics
- Type aliases
- Improved editor tooling

Raycast extensions are commonly developed with TypeScript and React.
`,
          tags: ["TypeScript", "JavaScript", "web-development"],
          links: [],
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
              text: child.children.length === 0 ? `${child.tags.length} tags` : `${child.children.length} topics`,
            },
          ]}
          actions={
            <ActionPanel>
              <Action.Push title="View Details" icon={Icon.Eye} target={<NodeDetail node={child} />} />

              {child.children.length > 0 && (
                <Action.Push title="Open Children" icon={Icon.ArrowRight} target={<NodeList node={child} />} />
              )}

              <Action.CopyToClipboard title="Copy Path" content={buildPath(knowledgeTree, child.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function NodeDetail({ node }: { node: MapNode }) {
  return (
    <Detail
      markdown={node.content}
      navigationTitle={node.title}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Description" text={node.description} />

          <Detail.Metadata.TagList title="Tags">
            {node.tags.map((tag) => (
              <Detail.Metadata.TagList.Item key={tag} text={tag} />
            ))}
          </Detail.Metadata.TagList>

          <Detail.Metadata.Label title="Child Topics" text={String(node.children.length)} />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          {node.children.length > 0 && (
            <Action.Push title="Open Children" icon={Icon.ArrowRight} target={<NodeList node={node} />} />
          )}

          <Action.CopyToClipboard title="Copy Content" content={node.content} />

          <Action.CopyToClipboard title="Copy Path" content={buildPath(knowledgeTree, node.id)} />

          {node.links.map((link) => (
            <Action.OpenInBrowser key={link.url} title={`Open ${link.title}`} url={link.url} />
          ))}
        </ActionPanel>
      }
    />
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
