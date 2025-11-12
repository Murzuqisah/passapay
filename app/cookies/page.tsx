'use client';

import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import { Footer } from "../components/Footer";

export default function CookiePolicy() {
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: January 23, 2025</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Cookie Policy explains how Passa Inc. (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking technologies when you visit our website at passapay.com, use our mobile application, or interact with our services (collectively, the &quot;Platform&quot;). This policy should be read alongside our Privacy Policy and Terms of Use.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By continuing to use our Platform, you consent to our use of cookies as described in this policy. If you do not agree with our use of cookies, you should adjust your browser settings or discontinue use of our Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our Platform. They contain information that is transferred to your device&apos;s hard drive and allow us to recognize your device and store some information about your preferences or past actions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies serve various purposes, including helping us provide you with a better experience by remembering your preferences, understanding how you use our services, and ensuring the security and functionality of our Platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Similar technologies include web beacons, pixels, tags, and scripts that collect and track information and improve and analyze our services. We use the term &quot;cookies&quot; in this policy to refer to all such technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Passa uses cookies for various legitimate business purposes to enhance your experience and ensure the proper functioning of our payment platform for creators. Our cookie usage includes:
              </p>
              <div className="space-y-3">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Essential Platform Operations</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>User authentication and session management</li>
                    <li>Security measures and fraud prevention</li>
                    <li>Payment processing and transaction security</li>
                    <li>Load balancing and platform stability</li>
                  </ul>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">User Experience Enhancement</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Remembering your preferences and settings</li>
                    <li>Language and currency selection</li>
                    <li>Theme and display preferences</li>
                    <li>Form data retention for convenience</li>
                  </ul>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Analytics and Performance</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Understanding user behavior and platform usage</li>
                    <li>Measuring performance and identifying issues</li>
                    <li>A/B testing for feature improvements</li>
                    <li>Error tracking and debugging</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Detailed Cookie Categories</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3">3.1. Strictly Necessary Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies are absolutely essential for the Platform to function properly and cannot be disabled in our systems. They are usually only set in response to actions made by you which amount to a request for services.
                  </p>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Examples include:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li><strong>Authentication tokens:</strong> Keep you logged in securely</li>
                      <li><strong>Session identifiers:</strong> Maintain your session across pages</li>
                      <li><strong>Security cookies:</strong> Protect against cross-site request forgery</li>
                      <li><strong>Load balancer cookies:</strong> Ensure consistent server routing</li>
                      <li><strong>Payment security:</strong> Secure transaction processing</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      Legal basis: Legitimate interest (essential for service provision)
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3">3.2. Performance and Analytics Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies collect information about how visitors use our Platform, which pages are visited most often, and if users get error messages from web pages. All information collected is aggregated and anonymous.
                  </p>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Specific implementations:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
                      <li><strong>Hotjar:</strong> User session recordings and heatmaps (anonymized)</li>
                      <li><strong>Custom analytics:</strong> Platform-specific usage metrics</li>
                      <li><strong>Performance monitoring:</strong> Page load times and error tracking</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      Legal basis: Legitimate interest (platform improvement) / Consent (where required)
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3">3.3. Functional Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies allow the Platform to remember choices you make and provide enhanced, more personal features. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Functionality includes:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li><strong>Language preferences:</strong> Remember your selected language</li>
                      <li><strong>Currency settings:</strong> Display prices in your preferred currency</li>
                      <li><strong>Theme preferences:</strong> Dark/light mode selection</li>
                      <li><strong>Dashboard layout:</strong> Customized interface arrangements</li>
                      <li><strong>Notification settings:</strong> Your communication preferences</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      Legal basis: Legitimate interest (enhanced user experience)
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3">3.4. Marketing and Targeting Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                  </p>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Marketing applications:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li><strong>Google Ads:</strong> Retargeting and conversion tracking</li>
                      <li><strong>Facebook Pixel:</strong> Social media advertising optimization</li>
                      <li><strong>LinkedIn Insight:</strong> Professional network targeting</li>
                      <li><strong>Custom audiences:</strong> Personalized marketing campaigns</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      Legal basis: Consent (explicit opt-in required)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies and Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We work with trusted third-party service providers who may set their own cookies when you use our Platform. We have carefully selected these partners and have agreements in place to ensure they handle your data responsibly.
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Processing Partners</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Stripe:</strong> Secure payment processing and fraud detection</li>
                    <li><strong>PayPal:</strong> Alternative payment method integration</li>
                    <li><strong>Blockchain providers:</strong> Cryptocurrency transaction processing</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Purpose: Essential for payment functionality and security
                  </p>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Analytics and Performance</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Google Analytics:</strong> Website usage statistics and user behavior</li>
                    <li><strong>Mixpanel:</strong> Product analytics and user journey tracking</li>
                    <li><strong>Sentry:</strong> Error monitoring and performance tracking</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Purpose: Platform optimization and user experience improvement
                  </p>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Communication and Support</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Intercom:</strong> Customer support chat functionality</li>
                    <li><strong>Mailchimp:</strong> Email marketing and newsletters</li>
                    <li><strong>Twilio:</strong> SMS notifications and two-factor authentication</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Purpose: Customer support and communication services
                  </p>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Social Media Integration</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Facebook:</strong> Social login and sharing features</li>
                    <li><strong>Twitter:</strong> Social media integration and sharing</li>
                    <li><strong>LinkedIn:</strong> Professional network integration</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Purpose: Social features and content sharing (optional)
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookie Duration and Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies have different lifespans depending on their purpose and type. We use both session cookies and persistent cookies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Session Cookies</h4>
                  <p className="text-muted-foreground mb-2">
                    These are temporary cookies that are deleted when you close your browser or end your session.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Authentication tokens</li>
                    <li>Shopping cart contents</li>
                    <li>Form data during multi-step processes</li>
                    <li>Temporary security measures</li>
                  </ul>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Persistent Cookies</h4>
                  <p className="text-muted-foreground mb-2">
                    These cookies remain on your device for a specified period or until you manually delete them:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Remember me:</strong> 30 days (login preferences)</li>
                    <li><strong>User preferences:</strong> 1 year (language, theme, currency)</li>
                    <li><strong>Analytics:</strong> 2 years (Google Analytics default)</li>
                    <li><strong>Marketing:</strong> 90 days (advertising and retargeting)</li>
                    <li><strong>Performance:</strong> 1 year (platform optimization data)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Cookie Choices and Controls</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have several options for managing cookies on our Platform. We respect your choices and provide multiple ways to control your cookie preferences.
              </p>

              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-2">Cookie Consent Manager</h4>
                  <p className="text-muted-foreground mb-2">
                    When you first visit our Platform, you&apos;ll see a cookie consent banner allowing you to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize your preferences by category</li>
                    <li>Learn more about each cookie type</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can change these preferences at any time through your account settings.
                  </p>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Browser-Level Controls</h4>
                  <p className="text-muted-foreground mb-2">
                    All modern browsers allow you to control cookies through their settings:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Block all cookies</li>
                    <li>Block third-party cookies only</li>
                    <li>Delete existing cookies</li>
                    <li>Receive notifications when cookies are set</li>
                    <li>Set exceptions for specific websites</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Comprehensive Browser Instructions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Here are detailed instructions for managing cookies in popular browsers:
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Google Chrome</h4>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Click the three dots menu → Settings</li>
                    <li>Go to Privacy and security → Cookies and other site data</li>
                    <li>Choose your preferred cookie settings</li>
                    <li>To delete cookies: Click &quot;See all cookies and site data&quot;</li>
                    <li>Search for &quot;passapay.com&quot; and remove if desired</li>
                  </ol>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Mozilla Firefox</h4>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Click the menu button → Options (or Preferences)</li>
                    <li>Select Privacy & Security</li>
                    <li>Under Cookies and Site Data, click &quot;Manage Data&quot;</li>
                    <li>Search for &quot;passapay.com&quot; to manage our cookies specifically</li>
                    <li>Use &quot;Clear Data&quot; to remove all cookies</li>
                  </ol>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Safari (macOS)</h4>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Safari menu → Preferences → Privacy</li>
                    <li>Click &quot;Manage Website Data&quot;</li>
                    <li>Search for &quot;passapay.com&quot; and remove if desired</li>
                    <li>Adjust &quot;Block all cookies&quot; setting as preferred</li>
                  </ol>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Microsoft Edge</h4>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Click the three dots menu → Settings</li>
                    <li>Go to Privacy, search, and services</li>
                    <li>Under Cookies, click &quot;Manage and delete cookies and site data&quot;</li>
                    <li>Find &quot;passapay.com&quot; and manage accordingly</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Do Not Track and Global Privacy Control</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We respect user privacy preferences and support various privacy signals:
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Do Not Track (DNT)</h4>
                  <p className="text-muted-foreground mb-2">
                    When your browser sends a Do Not Track signal, we:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Disable non-essential analytics cookies</li>
                    <li>Turn off marketing and advertising cookies</li>
                    <li>Limit data collection to essential functionality only</li>
                    <li>Respect your privacy preference across all our services</li>
                  </ul>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Global Privacy Control (GPC)</h4>
                  <p className="text-muted-foreground mb-2">
                    We honor Global Privacy Control signals by:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Automatically opting you out of data sales</li>
                    <li>Limiting targeted advertising</li>
                    <li>Reducing data sharing with third parties</li>
                    <li>Applying privacy preferences across our platform</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Legal Basis and Compliance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our use of cookies is based on various legal grounds depending on the type of cookie and your location:
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">GDPR Compliance (EU/UK)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Consent:</strong> Marketing and non-essential analytics cookies</li>
                    <li><strong>Legitimate Interest:</strong> Essential functionality and security</li>
                    <li><strong>Contractual Necessity:</strong> Payment processing and account management</li>
                    <li><strong>Legal Obligation:</strong> Compliance and regulatory requirements</li>
                  </ul>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">CCPA/CPRA Compliance (California)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Right to know what cookies we collect</li>
                    <li>Right to delete cookie data</li>
                    <li>Right to opt-out of sale/sharing</li>
                    <li>Right to non-discrimination</li>
                  </ul>
                </div>

                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Other Jurisdictions</h4>
                  <p className="text-muted-foreground">
                    We comply with applicable data protection laws in all jurisdictions where we operate, including Kenya&apos;s Data Protection Act, 2019, and other relevant international privacy regulations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Impact of Disabling Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While you have the right to disable cookies, doing so may affect your experience on our Platform:
              </p>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-800">Essential Cookies Disabled</h4>
                  <ul className="list-disc list-inside text-red-700 space-y-1 ml-4">
                    <li>Unable to log in or maintain sessions</li>
                    <li>Payment processing may fail</li>
                    <li>Security features compromised</li>
                    <li>Platform may not function properly</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-yellow-800">Functional Cookies Disabled</h4>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1 ml-4">
                    <li>Preferences not remembered between visits</li>
                    <li>Need to re-select language/currency each time</li>
                    <li>Customized settings lost</li>
                    <li>Reduced user experience quality</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">Analytics Cookies Disabled</h4>
                  <ul className="list-disc list-inside text-blue-700 space-y-1 ml-4">
                    <li>We cannot improve platform based on usage data</li>
                    <li>Performance issues may go undetected</li>
                    <li>Feature development may be less targeted</li>
                    <li>User experience optimization limited</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Updates and Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>Update the &quot;Last Updated&quot; date at the top of this policy</li>
                <li>Notify you through our Platform or via email for significant changes</li>
                <li>Provide a summary of key changes when material updates are made</li>
                <li>Give you the opportunity to review and accept new cookie preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and protect your privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding our use of cookies, please don&apos;t hesitate to contact us:
              </p>
              
              <div className="bg-muted/10 p-6 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <strong>Email:</strong> <a href="mailto:privacy@passafrika.com" className="text-primary hover:underline">privacy@passafrika.com</a>
                  </div>
                  <div>
                    <strong>Data Protection Officer:</strong> <a href="mailto:dpo@passafrika.com" className="text-primary hover:underline">dpo@passafrika.com</a>
                  </div>
                  <div>
                    <strong>General Support:</strong> <a href="mailto:support@passafrika.com" className="text-primary hover:underline">support@passafrika.com</a>
                  </div>
                  <div>
                    <strong>Postal Address:</strong><br />
                    Passa Inc.<br />
                    Kisumu County, Kisumu<br />
                    Kenya
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mt-4">
                We aim to respond to all privacy-related inquiries within 30 days. For urgent matters, please mark your email as &quot;Urgent - Privacy Request&quot; in the subject line.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}