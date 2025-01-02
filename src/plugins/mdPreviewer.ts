import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import hljs from "highlight.js";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
})
  .use(createKatexPlugin())
  .use(createCopyCodePlugin());
export default VMdPreview;
