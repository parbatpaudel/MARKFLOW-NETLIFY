"use strict";(()=>{var e={};e.id=691,e.ids=[691],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},83164:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>m,originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>u,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>f});var r={};o.r(r),o.d(r,{POST:()=>c});var i=o(95419),a=o(69108),n=o(99678),s=o(78070);async function c(e){try{let{name:t,email:o,businessName:r,industry:i,message:a,source:n}=await e.json();console.log("\uD83D\uDCE7 New Contact Notification:",{name:t,email:o,businessName:r,industry:i,message:a,source:n,timestamp:new Date().toISOString()});let c=process.env.RESEND_API_KEY,p=process.env.NOTIFICATION_EMAIL||"contact@marketflow.com";if(c)try{let e=`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #003459; border-bottom: 3px solid #007ea7; padding-bottom: 10px;">
              New ${"chat"===n?"Chat":"Contact Form"} Submission
            </h2>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007ea7; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${t}</p>
              <p><strong>Email:</strong> <a href="mailto:${o}">${o}</a></p>
              <p><strong>Business Name:</strong> ${r}</p>
              <p><strong>Industry:</strong> ${i}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #00a8e8; margin: 20px 0;">
              <h3 style="color: #007ea7; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6;">${a}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
              <p>This notification was generated from the marketflow ${"chat"===n?"chatbot":"contact form"}.</p>
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,d=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({from:"marketflow <onboarding@resend.dev>",to:[p],subject:`New Lead: ${r} (${i})`,html:e,reply_to:o})});if(d.ok){let e=await d.json();return console.log("✅ Email notification sent:",e),s.Z.json({success:!0,message:"Notification sent successfully",emailSent:!0})}{let e=await d.text();console.error("Resend API error:",e)}}catch(e){console.error("Email sending error:",e)}return s.Z.json({success:!0,message:"Notification logged (email not configured)",emailSent:!1})}catch(e){return console.error("Notification API error:",e),s.Z.json({error:"Failed to process notification"},{status:500})}}let p=new i.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/send-notification/route",pathname:"/api/send-notification",filename:"route",bundlePath:"app/api/send-notification/route"},resolvedPagePath:"C:\\Users\\LENOVO\\Desktop\\cursor\\app\\api\\send-notification\\route.ts",nextConfigOutput:"standalone",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:u,headerHooks:m,staticGenerationBailout:f}=p,g="/api/send-notification/route";function h(){return(0,n.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:l})}}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[638,206],()=>o(83164));module.exports=r})();