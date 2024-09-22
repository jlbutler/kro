"use strict";(self.webpackChunksymphony_docs=self.webpackChunksymphony_docs||[]).push([[531],{1721:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=s(4848),t=s(8453);const r={sidebar_position:2},a="2. Simple Schema",o={id:"docs/concepts/simple-schema",title:"2. Simple Schema",description:"Symphony's Simple Schema provides a powerful yet intuitive way to define the structure",source:"@site/docs/docs/concepts/10-simple-schema.md",sourceDirName:"docs/concepts",slug:"/docs/concepts/simple-schema",permalink:"/docs/docs/concepts/simple-schema",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/docs/concepts/10-simple-schema.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"1. ResourceGroups",permalink:"/docs/docs/concepts/resource-groups"},next:{title:"3. Claims",permalink:"/docs/docs/concepts/claims"}},l={},d=[{value:"Simple Schema Features Explained",id:"simple-schema-features-explained",level:2},{value:"1. Spec Field Definition",id:"1-spec-field-definition",level:3},{value:"Basic Types",id:"basic-types",level:4},{value:"Structure types",id:"structure-types",level:4},{value:"Map Types",id:"map-types",level:4},{value:"2. Validation and Documentation Markers",id:"2-validation-and-documentation-markers",level:3},{value:"3. Custom Types Definition",id:"3-custom-types-definition",level:3},{value:"4. Status Field Definition",id:"4-status-field-definition",level:3},{value:"Value Marker <strong>NOT IMPLEMENTED</strong>",id:"value-marker-not-implemented",level:4},{value:"Default status fields",id:"default-status-fields",level:2},{value:"1. Conditions",id:"1-conditions",level:3},{value:"2. State",id:"2-state",level:3}];function c(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"2-simple-schema",children:"2. Simple Schema"})}),"\n",(0,i.jsx)(n.p,{children:"Symphony's Simple Schema provides a powerful yet intuitive way to define the structure\nof your ResourceGroup. Here is comprehensive example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'apiVersion: symphony.k8s.aws/v1alpha1\nkind: ResourceGroup\nmetadata:\n  name: webapplication.symphony.k8s.aws\nspec:\n  apiVersion: v1alpha1\n  kind: WebApplication\n  parameters:\n    spec:\n      name: string | required=true description="Name of the web application"\n      replicas: integer | default=1 minimum=1 maximum=10\n      image: string | required=true\n      ports:\n        - port: integer | required=true\n          targetPort: integer\n      env: \'map[string]string\'\n      config: ConfigType\n      configArray: []ConfigType\n    customTypes:\n      ConfigType:\n        logLevel: string | enum="debug,info,warn,error" default="info"\n        maxConnections: integer | minimum=1 maximum=1000\n    status:\n      url: ${service.status.loadBalancer.ingress[0].hostname}"\n  resources: []\n'})}),"\n",(0,i.jsx)(n.h2,{id:"simple-schema-features-explained",children:"Simple Schema Features Explained"}),"\n",(0,i.jsx)(n.h3,{id:"1-spec-field-definition",children:"1. Spec Field Definition"}),"\n",(0,i.jsx)(n.h4,{id:"basic-types",children:"Basic Types"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"string"}),": Basic string type"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"integer"}),": Whole number"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"boolean"}),": True/False value"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"for example to define a field that is a string, you can define it as follows:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"name: string\nage: integer\n"})}),"\n",(0,i.jsx)(n.h4,{id:"structure-types",children:"Structure types"}),"\n",(0,i.jsx)(n.p,{children:"Structure types or object types are defined by specifying the fields within the object. The fields\ncan be of basic types or other structure types."}),"\n",(0,i.jsx)(n.p,{children:"for example to define a structure type for a person with name and age fields, you can define it as\nfollows:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"person:\n  name: string\n  age: integer\n"})}),"\n",(0,i.jsx)(n.h4,{id:"map-types",children:"Map Types"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Arrays: Denoted by ",(0,i.jsx)(n.code,{children:"[]"}),", e.g., ",(0,i.jsx)(n.code,{children:"'[]string'"})]}),"\n",(0,i.jsxs)(n.li,{children:["Maps: Denoted by ",(0,i.jsx)(n.code,{children:"map[keyType]valueType"}),", e.g., ",(0,i.jsx)(n.code,{children:"'map[string]string'"})," and ",(0,i.jsx)(n.code,{children:"'map[string]Person'"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2-validation-and-documentation-markers",children:"2. Validation and Documentation Markers"}),"\n",(0,i.jsx)(n.p,{children:"In addition to the type, fields can also have markers for validation, documentation and\nother purposes that are OpenAPISchema compatible."}),"\n",(0,i.jsx)(n.p,{children:"For example to define a field that is required, has a default value and a description, you can\ndefine it as follows:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'person:\n  name: string | required=true default="Kylian Mbapp\xe9" description="Name of the person"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Currently supported markers include:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"required=true"}),": Field must be provided"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"default=value"}),": Default value if not provided"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'description="..."'}),": Provides documentation for the field"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'enum="value1,value2,..."'}),": Restricts to a set of values ",(0,i.jsx)(n.strong,{children:"NOT IMPLEMENTED"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"minimum=value"})," and ",(0,i.jsx)(n.code,{children:"maximum=value"}),": For numeric constraints ",(0,i.jsx)(n.strong,{children:"NOT IMPLEMENTED"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"3-custom-types-definition",children:"3. Custom Types Definition"}),"\n",(0,i.jsxs)(n.p,{children:["Custom types are defined in the ",(0,i.jsx)(n.code,{children:"customTypes"})," section, allowing for reusable complex\nstructures. They can be referenced by name in the spec or status fields."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'customTypes:\n  ConfigType:\n    logLevel: string | enum="debug,info,warn,error" default="info"\n    maxConnections: integer | minimum=1 maximum=1000\nspec:\n  config: ConfigType | required=true\n'})}),"\n",(0,i.jsx)(n.h3,{id:"4-status-field-definition",children:"4. Status Field Definition"}),"\n",(0,i.jsx)(n.p,{children:"Status fields are defined similarly to spec fields and can include validation and documentation\nmarkers. However on top of that, status fields can also include value markers:"}),"\n",(0,i.jsxs)(n.h4,{id:"value-marker-not-implemented",children:["Value Marker ",(0,i.jsx)(n.strong,{children:"NOT IMPLEMENTED"})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'value="${resource.status.field}"'}),": Specifies that this field's value should be dynamically\nobtained from another resource. The value is a CEL expression that is validated at ResourceGroup\nprocessing time and evaluated at runtime."]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsx)(n.p,{children:"Note that the value marker is a symphony extension to the OpenAPISchema and is not part of the\nofficial OpenAPISchema specification."})}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'status:\n  url: string | value="${service.status.loadBalancer.ingress[0].hostname}"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"default-status-fields",children:"Default status fields"}),"\n",(0,i.jsxs)(n.p,{children:["Symphony automatically injects two common fields into the status of all claims\ngenerated from ",(0,i.jsx)(n.strong,{children:"ResourceGroups"}),": ",(0,i.jsx)(n.code,{children:"conditions"})," and ",(0,i.jsx)(n.code,{children:"state"}),". These fields provide\nessential information about the current status of the claim and its associated\nresources."]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"conditions"})," and ",(0,i.jsx)(n.code,{children:"state"})," are reserved words in the status\nsection. If a user defines these fields in their ",(0,i.jsx)(n.strong,{children:"ResourceGroup"}),"'s status schema,\nSymphony will override them with its own values."]})}),"\n",(0,i.jsx)(n.h3,{id:"1-conditions",children:"1. Conditions"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"conditions"})," field is an array of condition objects, each representing a\nspecific aspect of the claim's state. Symphony automatically manages this field."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"status:\n  conditions: '[]condition'\ncustomTypes:\n  condition:\n    type: string\n    status: string | enum=\"True,False,Unknown\"\n    lastTransitionTime: string\n    reason: string\n    message: string\n"})}),"\n",(0,i.jsx)(n.p,{children:"Common condition types include:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Ready"}),": Indicates whether the claim is fully reconciled and operational."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Progressing"}),": Shows if the claim is in the process of reaching the desired state."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Degraded"}),": Signals that the claim is operational but not functioning optimally."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Error"}),": Indicates that an error has occurred during reconciliation."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2-state",children:"2. State"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"state"})," field provides a high-level summary of the claim's current status."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'status:\n  state: string | enum="Ready,Progressing,Degraded,Error,Terminating,Unknown"\n'})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["These default status fields are automatically added to every claim's status,\nproviding a consistent way to check the health and state of resources across\ndifferent ",(0,i.jsx)(n.strong,{children:"ResourceGroups"}),"."]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var i=s(6540);const t={},r=i.createContext(t);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);