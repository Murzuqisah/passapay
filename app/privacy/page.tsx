'use client';

import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import { Footer } from "../components/Footer";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated January 23, 2025</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Privacy Notice for Passa Inc. (<strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>), describes how and why we might access, collect, store, use, and/or share (<strong>&apos;process&apos;</strong>) your personal information when you use our services (<strong>&apos;Services&apos;</strong>), including when you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>Visit our website at passapay.com or any website of ours that links to this Privacy Notice</li>
                <li>Download and use our mobile application (PassaPay), or any other application of ours that links to this Privacy Notice</li>
                <li>Use PassaPay - The blockchain-powered payment platform designed specifically for artists, musicians, and creative professionals to receive instant cross-border payments through cryptocurrency and stablecoin transactions, eliminating traditional banking intermediaries and delays</li>
                <li>Connect digital wallets (Talisman, Polkadot.js, SubWallet) to our platform for payment processing</li>
                <li>Create artist profiles and payment links for fan support and client payments</li>
                <li>Process payments through Polkadot blockchain infrastructure</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:privacy@passa.com" className="text-primary hover:underline">privacy@passa.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Summary of Key Points</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 italic">
                This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</li>
                <li><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</li>
                <li><strong>Do we collect any information from third parties?</strong> We may collect limited information from third parties such as payment processors and identity verification services.</li>
                <li><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</li>
                <li><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties for payment processing, legal compliance, and service provision.</li>
                <li><strong>How do we keep your information safe?</strong> We have adequate organisational and technical processes and procedures in place to protect your personal information.</li>
                <li><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Information Do We Collect?</h2>
              <h3 className="text-xl font-semibold mb-3">Personal information you disclose to us</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> We collect personal information that you provide to us.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Personal Information Provided by You.</strong> The personal information that we collect may include the following:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 mb-4">
                <li>names and artist/stage names</li>
                <li>email addresses</li>
                <li>phone numbers</li>
                <li>mailing addresses</li>
                <li>contact or authentication data</li>
                <li>billing addresses</li>
                <li>digital wallet addresses (public keys only)</li>
                <li>blockchain transaction hashes and records</li>
                <li>tax identification numbers (for compliance)</li>
                <li>identity verification documents (government-issued ID, proof of address)</li>
                <li>artist portfolio information (bio, social media links, artwork samples)</li>
                <li>payment preferences and currency selections</li>
                <li>KYC (Know Your Customer) verification data</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Blockchain Data:</strong> We collect and store blockchain transaction data including wallet addresses, transaction amounts, timestamps, and transaction hashes. This data is inherently public on the blockchain but we associate it with your account for service provision.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Sensitive Information.</strong> We do not process sensitive information.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How Do We Process Your Information?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Account Management:</strong> To facilitate account creation, authentication, and user account management</li>
                <li><strong>Payment Processing:</strong> To deliver blockchain-based payment services to artists and creative professionals</li>
                <li><strong>Blockchain Transactions:</strong> To process cryptocurrency and stablecoin payments through Polkadot network</li>
                <li><strong>Wallet Integration:</strong> To connect and manage digital wallet integrations (Talisman, Polkadot.js, etc.)</li>
                <li><strong>Identity Verification:</strong> To verify artist identity and prevent platform misuse through KYC procedures</li>
                <li><strong>Customer Support:</strong> To respond to user inquiries and provide technical support</li>
                <li><strong>Service Communications:</strong> To send transaction confirmations, security alerts, and service updates</li>
                <li><strong>Payment Facilitation:</strong> To manage instant cross-border payments and eliminate traditional banking delays</li>
                <li><strong>Artist Profile Management:</strong> To maintain creator profiles, payment links, and portfolio information</li>
                <li><strong>Regulatory Compliance:</strong> To comply with AML, KYC, and tax reporting requirements</li>
                <li><strong>Fraud Prevention:</strong> To detect suspicious activities and ensure platform security</li>
                <li><strong>Blockchain Analytics:</strong> To monitor transaction patterns and network performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. When and With Whom Do We Share Your Personal Information?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We may need to share your personal information in the following situations:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Payment Processing:</strong> We share necessary information with payment processors and financial institutions to facilitate transactions</li>
                <li><strong>Identity Verification:</strong> We may share information with identity verification services to comply with regulatory requirements</li>
                <li><strong>Legal Compliance:</strong> We may disclose information when required by law or to protect our rights and the rights of our users</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with any merger, sale of company assets, or acquisition</li>
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist in operating our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How Long Do We Keep Your Information?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. How Do We Keep Your Information Safe?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> We aim to protect your personal information through a system of organisational and technical security measures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. You should only access the Services within a secure environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Do We Collect Information From Minors?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&apos;s use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. What Are Your Privacy Rights?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> Depending on your state of residence, you have rights that allow you greater access to and control over your personal information.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                In some regions, you have certain rights under applicable data protection laws. These may include the right:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 mb-4">
                <li>to request access and obtain a copy of your personal information</li>
                <li>to request rectification or erasure</li>
                <li>to restrict the processing of your personal information</li>
                <li>if applicable, to data portability</li>
                <li>not to be subject to automated decision-making</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Account Information:</strong> If you would at any time like to review or change the information in your account or terminate your account, you can log in to your account settings and update your user account.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or comments about your privacy rights, you may email us at <a href="mailto:privacy@passa.com" className="text-primary hover:underline">privacy@passa.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Do We Make Updates to This Notice?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &apos;Revised&apos; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. How Can You Contact Us About This Notice?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions or comments about this notice, you may email us at <a href="mailto:privacy@passa.com" className="text-primary hover:underline">privacy@passa.com</a> or contact us by post at:
              </p>
              <div className="text-muted-foreground leading-relaxed">
                Passa Inc.<br />
                support@passa.com
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. To request to review, update, or delete your personal information, please contact us at <a href="mailto:privacy@passa.com" className="text-primary hover:underline">privacy@passa.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}