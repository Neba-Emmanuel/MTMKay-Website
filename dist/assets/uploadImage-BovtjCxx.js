import{c as t}from"./index-CbMUGnpL.js";/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],p=t("image",n);/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],h=t("info",c);/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],m=t("trash",s);async function l(a,i){if(!["image/jpeg","image/png","image/webp","image/gif"].includes(a.type))throw new Error("Choose a JPEG, PNG, WebP, or GIF image");if(a.size>4*1024*1024)throw new Error("Image must be 4 MB or smaller");const r=new FormData;r.append("file",a),r.append("type",i);const o=await fetch(`${"https://mtmkay-backend.vercel.app/api".replace(/\/$/,"")}/upload`,{method:"POST",signal:AbortSignal.timeout(3e4),headers:{Authorization:`Bearer ${localStorage.getItem("token")||""}`},body:r}),e=await o.json().catch(()=>{throw new Error("Upload service is unavailable")});if(!o.ok)throw new Error(e.error||"Upload failed");if(!e.url||typeof e.url!="string"||!e.url.startsWith("https://"))throw new Error("Upload service returned an invalid image URL");return e.url}export{h as I,m as T,p as a,l as u};
