"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[691],{381:function(e,t,n){n.r(t);var r=n(4795),a=n(2841),i=n.n(a),o=n(2784),c=n(2497),s=n(828),d=n(7155),l=n(2228),u=n(2629),p=n(2322),m=c.default.div.withConfig({displayName:"pages__Container",componentId:"sc-19qwndd-0"})(["display:flex;flex-direction:column;align-items:center;flex:1;margin-top:.6rem;margin-bottom:7.6rem;","{padding-left:2.4rem;padding-right:2.4rem;margin-top:2rem;margin-bottom:2rem;width:auto;}"],(function(e){return e.theme.mediaQueries.small})),f=c.default.h1.withConfig({displayName:"pages__Heading",componentId:"sc-19qwndd-1"})(["margin-top:0;margin-bottom:2.4rem;text-align:center;"]),h=(c.default.span.withConfig({displayName:"pages__Span",componentId:"sc-19qwndd-2"})(["color:",";"],(function(e){return e.theme.colors.primary.default})),c.default.p.withConfig({displayName:"pages__Subtitle",componentId:"sc-19qwndd-3"})(["font-size:",";font-weight:500;margin-top:0;margin-bottom:0;","{font-size:",";}"],(function(e){return e.theme.fontSizes.large}),(function(e){return e.theme.mediaQueries.small}),(function(e){return e.theme.fontSizes.text}))),x=c.default.div.withConfig({displayName:"pages__CardContainer",componentId:"sc-19qwndd-4"})(["display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;max-width:64.8rem;width:100%;height:100%;margin-top:1.5rem;"]),g=c.default.label.withConfig({displayName:"pages__Label",componentId:"sc-19qwndd-5"})(["display:block;font-weight:bold;"]),b=c.default.select.withConfig({displayName:"pages__TokenSelect",componentId:"sc-19qwndd-6"})(["width:100%;margin-top:10px;margin-bottom:10px;"]),w=(c.default.div.withConfig({displayName:"pages__Notice",componentId:"sc-19qwndd-7"})(["background-color:",";border:1px solid ",";color:",";border-radius:",";padding:2.4rem;margin-top:2.4rem;max-width:60rem;width:100%;& > *{margin:0;}","{margin-top:1.2rem;padding:1.6rem;}"],(function(e){return e.theme.colors.background.alternative}),(function(e){return e.theme.colors.border.default}),(function(e){return e.theme.colors.text.alternative}),(function(e){return e.theme.radii.default}),(function(e){return e.theme.mediaQueries.small})),c.default.div.withConfig({displayName:"pages__ErrorMessage",componentId:"sc-19qwndd-8"})(["background-color:",";border:1px solid ",";color:",";border-radius:",";padding:2.4rem;margin-bottom:2.4rem;margin-top:2.4rem;max-width:60rem;width:100%;","{padding:1.6rem;margin-bottom:1.2rem;margin-top:1.2rem;max-width:100%;}"],(function(e){return e.theme.colors.error.muted}),(function(e){return e.theme.colors.error.default}),(function(e){return e.theme.colors.error.alternative}),(function(e){return e.theme.radii.default}),(function(e){return e.theme.mediaQueries.small}))),y=c.default.div.withConfig({displayName:"pages__ButtonGroup",componentId:"sc-19qwndd-9"})(["display:flex;gap:10px;"]);t.default=function(){var e=(0,u.KT)(),t=e[0],n=e[1],a=(n.isLoading,n.data),c=(0,o.useRef)(null),k=(0,o.useContext)(s.qR),v=k[0],j=k[1];(0,o.useEffect)((function(){t().then((function(e){return console.log("###: accounts",e)})).catch((function(e){return console.log("###: e",e)}))}),[]),(0,o.useEffect)((function(){function e(){return(e=(0,r.Z)(i().mark((function e(){var t,n,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.y0)();case 2:t=e.sent,(n=t&&t.contracts)&&n.length>0&&c&&(r=c.current.options,console.log(r),Array.from(r).forEach((function(e){n.includes(e.value)&&(e.selected=!0)})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var S=function(){var e=(0,r.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,d.yN)();case 3:return e.next=5,(0,d.kM)();case 5:t=e.sent,j({type:s.H1.SetInstalled,payload:t}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0),j({type:s.H1.SetError,payload:e.t0});case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();function C(e){return function(t){var n=a[0];(0,u.WY)({method:"eth_sendTransaction",params:[{from:n,to:e,value:"0x0",data:"0x1"}]})}}function _(){return(_=(0,r.Z)(i().mark((function e(t){var n,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=t.target.elements.tokens,r=Array.from(n.selectedOptions,(function(e){return e.value})),e.next=5,(0,d.IW)({contracts:r});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(){return(F=(0,r.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.y0)();case 2:return t=e.sent,e.abrupt("return",t.contracts);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(){return(I=(0,r.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.Jo)();case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,p.jsxs)(m,{children:[(0,p.jsx)(f,{children:"Spotter Snap"}),(0,p.jsx)(h,{children:"Real-time notifications on potential hacks. Stay secure!"}),(0,p.jsxs)(x,{children:[v.error&&(0,p.jsxs)(w,{children:[(0,p.jsx)("b",{children:"An error happened:"})," ",v.error.message]}),(0,p.jsx)(l.Zb,{content:{title:"Reconnect",description:"While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.",button:(0,p.jsx)(l.V1,{onClick:S})}}),!v.isFlask&&(0,p.jsx)(l.Zb,{content:{title:"Install",description:"Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.",button:(0,p.jsx)(l.zA,{})},fullWidth:!0}),v.installedSnap&&(0,p.jsx)(l.Zb,{background:"red",content:{title:"High Security Risk",description:"Try high risk contract.",button:(0,p.jsx)(l.zx,{onClick:C("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"),disabled:!v.isFlask,children:"Send"})},disabled:!v.isFlask}),v.installedSnap&&(0,p.jsx)(l.Zb,{background:"orange",content:{title:"Mid Security Risk",description:"Try mid risk contract.",button:(0,p.jsx)(l.zx,{onClick:C("0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"),disabled:!v.isFlask,children:"Send"})},disabled:!v.isFlask}),v.installedSnap&&(0,p.jsx)(l.Zb,{background:"green",content:{title:"No Security Risk",description:"Try no security risk contract.",button:(0,p.jsx)(l.zx,{onClick:C("0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE8"),disabled:!v.isFlask,children:"Send"})},disabled:!v.isFlask})]}),(0,p.jsx)(x,{children:(0,p.jsxs)("form",{id:"token-select",onSubmit:function(e){return _.apply(this,arguments)},onReset:function(){return I.apply(this,arguments)},children:[(0,p.jsx)(g,{htmlFor:"tokens",children:"Select tokens on Ethereum Mainnet to be monitored by Spotter Snap:"}),(0,p.jsxs)(b,{name:"tokens",id:"tokens",multiple:!0,ref:c,children:[(0,p.jsx)("option",{value:"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE8",children:"Aave WETH V3"}),(0,p.jsx)("option",{value:"0x95ecdc6caaf7e4805fcef2679a92338351d24297",children:"crvUSD"}),(0,p.jsx)("option",{value:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",children:"USDC"}),(0,p.jsx)("option",{value:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",children:"USDT"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(l.zx,{type:"submit",children:"Update"}),(0,p.jsx)(l.zx,{type:"Button",onClick:function(){return F.apply(this,arguments)},children:"Get Contracts"}),(0,p.jsx)(l.zx,{type:"reset",children:"Clear"})]})]})})]})}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-4b536cd9c2c0f8783f89.js.map