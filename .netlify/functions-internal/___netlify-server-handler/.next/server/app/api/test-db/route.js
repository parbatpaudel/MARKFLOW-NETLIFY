"use strict";(()=>{var e={};e.id=735,e.ids=[735],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39167:(e,s,t)=>{t.r(s),t.d(s,{headerHooks:()=>h,originalPathname:()=>y,patchFetch:()=>T,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>b});var r={};t.r(r),t.d(r,{GET:()=>u,POST:()=>l});var n=t(95419),o=t(69108),a=t(99678),c=t(78070),i=t(70922);async function u(){try{if(console.log("DATABASE_URL present:",!!process.env.DATABASE_URL),!await (0,i.M7)())return c.Z.json({success:!1,error:"Database connection failed",message:"Could not connect to Neon database. Please check your DATABASE_URL environment variable."},{status:500});try{await i.i6`
        INSERT INTO contacts (name, email, business_name, industry, message)
        VALUES ('Test User', 'test@example.com', 'Test Company', 'Testing', 'This is a test message')
      `;let e=await i.i6`
        SELECT * FROM contacts WHERE email = 'test@example.com' ORDER BY created_at DESC LIMIT 1
      `;return c.Z.json({success:!0,message:"Database connection and insertion successful",testRecord:e[0]})}catch(e){return console.error("Insert error:",e),c.Z.json({success:!1,error:"Database insertion failed",message:e.message,details:"Check server logs for details"},{status:500})}}catch(e){return console.error("Test DB error:",e),c.Z.json({success:!1,error:"Internal server error",message:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function l(e){try{let s=await e.json();if(console.log("Received test data:",s),!await (0,i.M7)())return c.Z.json({success:!1,error:"Database connection failed",message:"Could not connect to Neon database. Please check your DATABASE_URL environment variable."},{status:500});try{return await i.i6`
        INSERT INTO contacts (
          name, 
          email, 
          phone, 
          business_name, 
          industry, 
          company, 
          business_description, 
          subject, 
          message,
          country,
          other_country,
          country_code,
          business_size,
          annual_revenue,
          ebitda,
          currency,
          how_heard,
          other_how_heard,
          schedule_meeting
        )
        VALUES (
          ${s.name||"Test User"}, 
          ${s.email||"test@example.com"}, 
          ${s.phone||null}, 
          ${s.businessName||s.name||"Test Company"}, 
          ${s.industry||"Testing"}, 
          ${s.company||null}, 
          ${s.businessDescription||null}, 
          ${s.subject||null}, 
          ${s.message||"Test message"},
          ${s.country||null},
          ${s.otherCountry||null},
          ${s.countryCode||null},
          ${s.businessSize||null},
          ${s.annualRevenue||null},
          ${s.ebitda||null},
          ${s.currency||null},
          ${s.howHeard||null},
          ${s.otherHowHeard||null},
          ${s.scheduleMeeting||null}
        )
      `,console.log("✅ Test data inserted successfully"),c.Z.json({success:!0,message:"Test data inserted successfully"})}catch(e){return console.error("❌ Insert error:",e),c.Z.json({success:!1,error:"Database insertion failed",message:e.message,details:"Check server logs for details"},{status:500})}}catch(e){return console.error("Test DB POST error:",e),c.Z.json({success:!1,error:"Internal server error",message:e instanceof Error?e.message:"Unknown error"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/test-db/route",pathname:"/api/test-db",filename:"route",bundlePath:"app/api/test-db/route"},resolvedPagePath:"C:\\Users\\LENOVO\\Desktop\\cursor\\app\\api\\test-db\\route.ts",nextConfigOutput:"standalone",userland:r}),{requestAsyncStorage:m,staticGenerationAsyncStorage:p,serverHooks:g,headerHooks:h,staticGenerationBailout:b}=d,y="/api/test-db/route";function T(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:p})}},70922:(e,s,t)=>{t.d(s,{M7:()=>n,i6:()=>r});let r=(0,t(89539).qn)((()=>{let e=process.env.DATABASE_URL;if(!e)throw Error("DATABASE_URL environment variable is not set");if(!e.startsWith("postgresql://"))throw Error("Invalid DATABASE_URL format. Must start with postgresql://");return(e.includes("sslmode=disable")||e.includes("sslmode=allow"))&&console.warn("⚠️  WARNING: Database connection is not using strict SSL mode. Consider using sslmode=require"),e})());async function n(){try{return await r`SELECT NOW()`,console.log("✅ Neon database connected successfully"),!0}catch(e){return console.error("❌ Neon connection failed: Connection could not be established"),!1}}}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[638,206,539],()=>t(39167));module.exports=r})();