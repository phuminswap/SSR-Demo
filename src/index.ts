type PrimitiveNode = string | number | boolean | null | undefined;

interface ReactElement {
  type: string;
  props: Props;
  key?: string | number | null;
}

type ReactNode = ReactElement | PrimitiveNode;

type Props = any & { children?: ReactNode };

function isPrimitiveNode(node: ReactNode): node is PrimitiveNode {
  return typeof node !== "object" || node === null;
}

function createTextElement(text: string): ReactElement {
  const newText = document.createTextNode(text);
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: newText,
      children: []
    },
  }
}

function createElement(type: string, props: object | null, ...children: ReactNode[]): ReactNode {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

function render(element: ReactNode, container: Node) {
  if (!element) {
    return;
  }
  if (isPrimitiveNode(element)) {
    const textElement = createTextElement(element.toString());
    container.appendChild(textElement.props.nodeValue);
    return;
  }

  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key: any) => key !== "children";

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      // @ts-ignore
      dom[name] = element.props[name];
    });
  console.log("Rendering element:", element.type, "with props:", element.props);
  element.props.children.forEach((child: ReactElement) => render(child, dom));

  container.appendChild(dom);
}


const Didact = {
  createElement,
  render
};

const DidactList = [
  Didact.createElement("li", null, "Item 1"),
  Didact.createElement("li", null, "Item 2"),
  Didact.createElement("li", null, "Item 3")
]

const element = Didact.createElement(
  "div",
  { style: "background: salmon" },
  Didact.createElement("h1", null, "Hello World"),
  Didact.createElement("h2", { style: "text-align:right" }, "from Didact"),
  Didact.createElement("p", { style: "background-color: gray" }, ...DidactList),
  Didact.createElement("input", { type: "text", placeholder: "Type here   ..." }),
);

const container = document.getElementById("root");

if (!container) {
  throw new Error("Container element not found");
}

Didact.render(element, container);
