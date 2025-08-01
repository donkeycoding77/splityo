"use client";
import Link from "next/link";
import Logo from "@/components/common/Logo";

export default function Terms() {
  return (
    <main className="min-h-screen bg-main-gradient flex flex-col items-center px-4 pt-6 pb-12">
      <Logo />
      <div className="max-w-2xl w-full">
        <Link href="/" className="inline-flex mb-4 gap-2 text-green-500 hover:text-pink-500 font-bold text-lg transition-colors">
          <span className="text-2xl">←</span> Back
        </Link>
        <h1 className="text-4xl font-extrabold text-pink-500 mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-6">Last updated May 25, 2025</p>
        <h2 className="text-2xl font-bold text-green-500 mt-8 mb-2">Table of Contents</h2>
        <ol className="list-decimal list-inside mb-8 text-blue-700 space-y-1 font-bold">
          <li><a href="#our-services" className="hover:underline">OUR SERVICES</a></li>
          <li><a href="#intellectual-property-rights" className="hover:underline">INTELLECTUAL PROPERTY RIGHTS</a></li>
          <li><a href="#user-representations" className="hover:underline">USER REPRESENTATIONS</a></li>
          <li><a href="#purchases-and-payment" className="hover:underline">PURCHASES AND PAYMENT</a></li>
          <li><a href="#prohibited-activities" className="hover:underline">PROHIBITED ACTIVITIES</a></li>
          <li><a href="#user-generated-contributions" className="hover:underline">USER GENERATED CONTRIBUTIONS</a></li>
          <li><a href="#contribution-license" className="hover:underline">CONTRIBUTION LICENSE</a></li>
          <li><a href="#third-party-websites-and-content" className="hover:underline">THIRD-PARTY WEBSITES AND CONTENT</a></li>
          <li><a href="#advertisers" className="hover:underline">ADVERTISERS</a></li>
          <li><a href="#services-management" className="hover:underline">SERVICES MANAGEMENT</a></li>
          <li><a href="#privacy-policy" className="hover:underline">PRIVACY POLICY</a></li>
          <li><a href="#term-and-termination" className="hover:underline">TERM AND TERMINATION</a></li>
          <li><a href="#modifications-and-interruptions" className="hover:underline">MODIFICATIONS AND INTERRUPTIONS</a></li>
          <li><a href="#governing-law" className="hover:underline">GOVERNING LAW</a></li>
          <li><a href="#dispute-resolution" className="hover:underline">DISPUTE RESOLUTION</a></li>
          <li><a href="#corrections" className="hover:underline">CORRECTIONS</a></li>
          <li><a href="#disclaimer" className="hover:underline">DISCLAIMER</a></li>
          <li><a href="#limitations-of-liability" className="hover:underline">LIMITATIONS OF LIABILITY</a></li>
          <li><a href="#indemnification" className="hover:underline">INDEMNIFICATION</a></li>
          <li><a href="#user-data" className="hover:underline">USER DATA</a></li>
          <li><a href="#electronic-communications-transactions-and-signatures" className="hover:underline">ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a></li>
          <li><a href="#california-users-and-residents" className="hover:underline">CALIFORNIA USERS AND RESIDENTS</a></li>
          <li><a href="#miscellaneous" className="hover:underline">MISCELLANEOUS</a></li>
          <li><a href="#contact-us" className="hover:underline">CONTACT US</a></li>
        </ol>
        {/* --- BEGIN TERMS SECTIONS --- */}
        <h2 id="our-services" className="text-2xl font-bold text-green-500 mt-8 mb-2">1. OUR SERVICES</h2>
        <p className="text-gray-700 mb-4">
          The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
        </p>
        <p className="text-gray-700 mb-4">
          The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
        </p>

        <h2 id="intellectual-property-rights" className="text-2xl font-bold text-green-500 mt-8 mb-2">2. INTELLECTUAL PROPERTY RIGHTS</h2>
        <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-2">Our intellectual property</h3>
        <p className="text-gray-700 mb-4">
          We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
        </p>
        <p className="text-gray-700 mb-4">
          Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
        </p>
        <p className="text-gray-700 mb-4">
          The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
        </p>
        <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-2">Your use of our Services</h3>
        <p className="text-gray-700 mb-4">
          Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>access the Services; and</li>
          <li>download or print a copy of any portion of the Content to which you have properly gained access.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          solely for your personal, non-commercial use or internal business purpose.
        </p>
        <p className="text-gray-700 mb-4">
          Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
        </p>
        <p className="text-gray-700 mb-4">
          If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:splityocash@gmail.com" className="text-pink-500 underline">splityocash@gmail.com</a>.
        </p>
        <p className="text-gray-700 mb-4">
          If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
        </p>
        <p className="text-gray-700 mb-4">
          We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
        </p>
        <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-2">Your submissions</h3>
        <p className="text-gray-700 mb-4">
          Please review this section and the &quot;PROHIBITED ACTIVITIES&quot; section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
        </p>
        <p className="text-gray-700 mb-4">
          Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
        </p>
        <p className="text-gray-700 mb-4">
          You are responsible for what you post or upload: By sending us Submissions through any part of the Services you:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>confirm that you have read and agree with our &quot;PROHIBITED ACTIVITIES&quot; and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
          <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
          <li>warrant that any such Submission is original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
          <li>warrant and represent that your Submissions do not constitute confidential information.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party&apos;s intellectual property rights, or (c) applicable law.
        </p>

        <h2 id="user-representations" className="text-2xl font-bold text-green-500 mt-8 mb-2">3. USER REPRESENTATIONS</h2>
        <p className="text-gray-700 mb-4">
          By using the Services, you represent and warrant that:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>all registration information you submit will be true, accurate, current, and complete;</li>
          <li>you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
          <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
          <li>you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services;</li>
          <li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
          <li>you will not use the Services for any illegal or unauthorized purpose; and</li>
          <li>your use of the Services will not violate any applicable law or regulation.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
        </p>

        <h2 id="purchases-and-payment" className="text-2xl font-bold text-green-500 mt-8 mb-2">4. PURCHASES AND PAYMENT</h2>
        <p className="text-gray-700 mb-4">
          We accept the following forms of payment: [List payment methods here]
        </p>
        <p className="text-gray-700 mb-4">
          You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in [currency].
        </p>
        <p className="text-gray-700 mb-4">
          You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
        </p>
        <p className="text-gray-700 mb-4">
          We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
        </p>

        <h2 id="prohibited-activities" className="text-2xl font-bold text-green-500 mt-8 mb-2">5. PROHIBITED ACTIVITIES</h2>
        <p className="text-gray-700 mb-4">
          You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>
        <p className="text-gray-700 mb-4">As a user of the Services, you agree not to:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
          <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
          <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
          <li>Use the Services to advertise or offer to sell goods and services.</li>
          <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
          <li>Engage in unauthorized framing of or linking to the Services.</li>
          <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
          <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
          <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
          <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
          <li>Attempt to impersonate another user or person or use the username of another user.</li>
          <li>Sell or otherwise transfer your profile.</li>
          <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
          <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
          <li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
          <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
          <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
          <li>Delete the copyright or other proprietary rights notice from any Content.</li>
          <li>Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
          <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party&apos;s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
          <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (&quot;gifs&quot;), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as &quot;spyware&quot; or &quot;passive collection mechanisms&quot; or &quot;pcms&quot;).</li>
          <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or using or launching any unauthorized script or other software.</li>
          <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
          <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
        </ul>

        <h2 id="user-generated-contributions" className="text-2xl font-bold text-green-500 mt-8 mb-2">6. USER GENERATED CONTRIBUTIONS</h2>
        <p className="text-gray-700 mb-4">
          The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &quot;Contributions&quot;). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
          <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your &quot;Contributions&quot; in any manner contemplated by the Services and these Legal Terms.</li>
          <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
          <li>Your Contributions are not false, inaccurate, or misleading.</li>
          <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
          <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
          <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
          <li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
          <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
          <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
          <li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors;</li>
          <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
          <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
        </p>

        <h2 id="contribution-license" className="text-2xl font-bold text-green-500 mt-8 mb-2">7. CONTRIBUTION LICENSE</h2>
        <p className="text-gray-700 mb-4">
          By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.
        </p>
        <p className="text-gray-700 mb-4">
          This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.
        </p>
        <p className="text-gray-700 mb-4">
          You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
        </p>
        <p className="text-gray-700 mb-4">
          We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
        </p>
        <p className="text-gray-700 mb-4">
          We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
        </p>
        {/* --- END TERMS SECTIONS --- */}

        {/* --- CONTINUED TERMS SECTIONS --- */}
        <h2 id="third-party-websites-and-content" className="text-2xl font-bold text-green-500 mt-8 mb-2">8. THIRD-PARTY WEBSITES AND CONTENT</h2>
        <p className="text-gray-700 mb-4">
          The Services may contain (or you may be sent via the Site) links to other websites (&quot;Third-Party Websites&quot;) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (&quot;Third-Party Content&quot;). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
        </p>

        <h2 id="advertisers" className="text-2xl font-bold text-green-500 mt-8 mb-2">9. ADVERTISERS</h2>
        <p className="text-gray-700 mb-4">
          We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
        </p>

        <h2 id="services-management" className="text-2xl font-bold text-green-500 mt-8 mb-2">10. SERVICES MANAGEMENT</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
        </p>

        <h2 id="privacy-policy" className="text-2xl font-bold text-green-500 mt-8 mb-2">11. PRIVACY POLICY</h2>
        <p className="text-gray-700 mb-4">
          We care about data privacy and security. Please review our Privacy Policy: <a href="/privacy" className="text-pink-500 underline">splityo.cash/privacy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Canada. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Canada, then through your continued use of the Services, you are transferring your data to Canada, and you expressly consent to have your data transferred to and processed in Canada. Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children&apos;s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Services as quickly as is reasonably practical.
        </p>

        <h2 id="term-and-termination" className="text-2xl font-bold text-green-500 mt-8 mb-2">12. TERM AND TERMINATION</h2>
        <p className="text-gray-700 mb-4">
          These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
        </p>
        <p className="text-gray-700 mb-4">
          If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
        </p>

        <h2 id="modifications-and-interruptions" className="text-2xl font-bold text-green-500 mt-8 mb-2">13. MODIFICATIONS AND INTERRUPTIONS</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
        </p>
        <p className="text-gray-700 mb-4">
          We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
        </p>

        <h2 id="governing-law" className="text-2xl font-bold text-green-500 mt-8 mb-2">14. GOVERNING LAW</h2>
        <p className="text-gray-700 mb-4">
          These Legal Terms shall be governed by and defined following the laws of Canada. Splityo and yourself irrevocably consent that the courts of Canada shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
        </p>

        <h2 id="dispute-resolution" className="text-2xl font-bold text-green-500 mt-8 mb-2">15. DISPUTE RESOLUTION</h2>
        <p className="text-gray-700 mb-4">
          You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the Canada courts. Splityo shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Legal Terms are entered into in the course of your trade or profession, the state of your principal place of business.
        </p>

        <h2 id="corrections" className="text-2xl font-bold text-green-500 mt-8 mb-2">16. CORRECTIONS</h2>
        <p className="text-gray-700 mb-4">
          There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
        </p>

        <h2 id="disclaimer" className="text-2xl font-bold text-green-500 mt-8 mb-2">17. DISCLAIMER</h2>
        <p className="text-gray-700 mb-4">
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
        </p>

        <h2 id="limitations-of-liability" className="text-2xl font-bold text-green-500 mt-8 mb-2">18. LIMITATIONS OF LIABILITY</h2>
        <p className="text-gray-700 mb-4">
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
        </p>

        <h2 id="indemnification" className="text-2xl font-bold text-green-500 mt-8 mb-2">19. INDEMNIFICATION</h2>
        <p className="text-gray-700 mb-4">
          You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
        </p>

        <h2 id="user-data" className="text-2xl font-bold text-green-500 mt-8 mb-2">20. USER DATA</h2>
        <p className="text-gray-700 mb-4">
          We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
        </p>

        <h2 id="electronic-communications-transactions-and-signatures" className="text-2xl font-bold text-green-500 mt-8 mb-2">21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
        <p className="text-gray-700 mb-4">
          Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
        </p>

        <h2 id="california-users-and-residents" className="text-2xl font-bold text-green-500 mt-8 mb-2">22. CALIFORNIA USERS AND RESIDENTS</h2>
        <p className="text-gray-700 mb-4">
          If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
        </p>

        <h2 id="miscellaneous" className="text-2xl font-bold text-green-500 mt-8 mb-2">23. MISCELLANEOUS</h2>
        <p className="text-gray-700 mb-4">
          These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
        </p>

        <h2 id="contact-us" className="text-2xl font-bold text-green-500 mt-8 mb-2">24. CONTACT US</h2>
        <p className="text-gray-700 mb-4">
          In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
        </p>
        <p className="text-gray-700 mb-4 font-bold">Splityo<br/>Canada<br/><a href="mailto:splityocash@gmail.com" className="text-pink-500 underline">splityocash@gmail.com</a></p>
        {/* --- END TERMS SECTIONS --- */}
      </div>
    </main>
  );
} 