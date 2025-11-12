'use client';

import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import { Footer } from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-2xl"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">Terms of Use</h1>
          <p className="text-muted-foreground mb-8">Last updated January 23, 2025</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Our Legal Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are Passa (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We operate <a href="https://passapay.com" className="text-primary hover:underline">passapay.com</a>, as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can contact us by email at <a href="mailto:info@passafrika.com" className="text-primary hover:underline">info@passafrika.com</a> or by mail to Passa, Kisumu County, Kisumu, Kenya.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Passa, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Legal Terms, and you waive any right to receive specific notice of each such change.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We recommend that you print a copy of these Legal Terms for your records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Our Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                PassaPay operates as a blockchain-based payment platform specifically designed for artists and creative professionals to receive instant cross-border payments. Our Services include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li><strong>Digital Wallet Integration:</strong> Secure wallet connections using Polkadot blockchain technology</li>
                <li><strong>Instant Payment Processing:</strong> Real-time cryptocurrency and stablecoin transactions (USDC, DOT)</li>
                <li><strong>Cross-Border Payment Solutions:</strong> Elimination of traditional banking intermediaries and delays</li>
                <li><strong>Artist Profile Management:</strong> Customizable payment links and portfolio showcases</li>
                <li><strong>Multi-Currency Support:</strong> Acceptance of payments in various cryptocurrencies and fiat equivalents</li>
                <li><strong>Transaction History:</strong> Comprehensive blockchain-verified payment records</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Blockchain Technology:</strong> Our platform utilizes Polkadot&apos;s interoperable blockchain infrastructure to ensure secure, transparent, and immutable transaction records. All payments are cryptographically secured and can be independently verified on the blockchain.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Regulatory Compliance:</strong> While blockchain technology enables borderless transactions, users remain responsible for compliance with their local tax obligations and financial regulations. PassaPay provides transaction records to assist with tax reporting requirements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Users in jurisdictions where cryptocurrency transactions are restricted or prohibited should not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold mb-3">Our intellectual property</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
              </p>
              <h3 className="text-xl font-semibold mb-3">Your use of our Services</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 mb-4">
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Representations</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                By using the Services, you represent and warrant that:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>You have the legal capacity and you agree to comply with these Legal Terms;</li>
                <li>You are not a minor in the jurisdiction in which you reside (minimum age 18);</li>
                <li>You will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                <li>You will not use the Services for any illegal or unauthorized purpose; and</li>
                <li>Your use of the Services will not violate any applicable law or regulation.</li>
                <li><strong>Artist/Creator Status:</strong> You are a legitimate artist, musician, performer, or creative professional;</li>
                <li><strong>Wallet Ownership:</strong> You own and control the digital wallet(s) connected to your account;</li>
                <li><strong>Tax Compliance:</strong> You will comply with all applicable tax obligations in your jurisdiction;</li>
                <li><strong>Identity Verification:</strong> All identity information provided is accurate and verifiable;</li>
                <li><strong>Financial Regulations:</strong> You comply with anti-money laundering (AML) and know-your-customer (KYC) requirements.</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Artist Verification:</strong> PassaPay reserves the right to verify your status as a legitimate creative professional through portfolio review, social media presence, or other reasonable means to prevent platform misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3A. Blockchain Payment Terms</h2>
              <h3 className="text-xl font-semibold mb-3">Transaction Finality</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All blockchain transactions processed through PassaPay are final and irreversible once confirmed on the Polkadot network. Users acknowledge that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>Cryptocurrency transactions cannot be reversed or refunded by PassaPay</li>
                <li>Transaction fees (gas fees) are determined by network conditions and are non-refundable</li>
                <li>Users are responsible for ensuring wallet addresses are correct before initiating transactions</li>
                <li>PassaPay is not liable for transactions sent to incorrect addresses</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3">Supported Assets</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                PassaPay currently supports the following digital assets:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 mb-4">
                <li>USDC (USD Coin) - Primary stablecoin for payments</li>
                <li>DOT (Polkadot) - Native network token</li>
                <li>Other Polkadot ecosystem tokens as announced</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                PassaPay may add or remove supported assets at its discretion with reasonable notice to users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                As a user of the Services, you agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services</li>
                <li>Use any information obtained from the Services in order to harass, abuse, or harm another person</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
                <li>Engage in unauthorized framing of or linking to the Services</li>
                <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party&apos;s uninterrupted use and enjoyment of the Services</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
                <li>Delete the copyright or other proprietary rights notice from any Content</li>
                <li>Attempt to impersonate another user or person or use the username of another user</li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you</li>
                <li>Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code</li>
                <li>Use the Services as part of any effort to compete with us or otherwise use the Services for any revenue-generating endeavor or commercial enterprise</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Services Management</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We reserve the right, but not the obligation, to:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                <li>Monitor the Services for violations of these Legal Terms;</li>
                <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms;</li>
                <li>In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions or any portion thereof;</li>
                <li>In our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and</li>
                <li>Otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Term and Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Legal Terms shall remain in full force and effect while you use the Services. <strong>WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Modifications and Interruptions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Legal Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. You and Passa irrevocably consent that the courts of Kenya shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms, your use of the Services, or any related matter.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Financial and Regulatory Compliance:</strong> Passa complies with all applicable business, financial, and data protection laws of Kenya, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>The Companies Act (Cap. 486)</li>
                <li>The Data Protection Act, 2019</li>
                <li>The Banking Act (Cap. 488) and related Central Bank of Kenya regulations (if applicable)</li>
                <li>The Capital Markets Act (Cap. 485A) (if applicable)</li>
                <li>The Proceeds of Crime and Anti-Money Laundering Act (POCAMLA)</li>
                <li>The Consumer Protection Act, 2012</li>
                <li>Any other relevant Kenyan statutes and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
              <h3 className="text-xl font-semibold mb-3">Informal Negotiations</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating court proceedings.
              </p>
              <h3 className="text-xl font-semibold mb-3">Court Proceedings</h3>
              <p className="text-muted-foreground leading-relaxed">
                If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute shall be resolved exclusively by the courts of Kenya, subject to the applicable laws of Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                <li>ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS;</li>
                <li>PERSONAL INJURY OR PROPERTY DAMAGE RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES;</li>
                <li>ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN;</li>
                <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES;</li>
                <li>ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES;</li>
                <li>ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Limitations of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                <li>Use of the Services;</li>
                <li>Breach of these Legal Terms;</li>
                <li>Any breach of your representations and warranties set forth in these Legal Terms;</li>
                <li>Your violation of the rights of a third party, including but not limited to intellectual property rights; or</li>
                <li>Any overt harmful act toward any other user of the Services with whom you connected via the Services.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. User Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Electronic Communications, Transactions, and Signatures</h2>
              <p className="text-muted-foreground leading-relaxed">
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing. <strong>YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Miscellaneous</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
              </p>
              <div className="text-muted-foreground leading-relaxed">
                <strong>Passa</strong><br />
                Kisumu County, Kisumu<br />
                Kenya<br />
                <a href="mailto:info@passafrika.com" className="text-primary hover:underline">info@passafrika.com</a>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}