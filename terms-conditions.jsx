/* ============================================================================
   Terms & Conditions — the Involve Asia Publisher Agreement.
   Hero reuses the Glossary page's gradient-hex hero (GlossaryHexField/Hero,
   here Tc*). Body reproduces the live involve.asia/terms-conditions/ copy in our
   design system. Loads AFTER ia-shared.jsx (Nav/Footer/BackToTop/hooks).
   ============================================================================ */

/* ---------- Hero (same component as the Glossary page) --------------------- */
let __tcGradN = 0;
function TcHexField() {
  const [paths, setPaths] = React.useState([]);
  const [gid] = React.useState(() => 'tcHexGrad' + (++__tcGradN));
  const W = 1204.11, H = 1189.86;
  const pad = 0.12;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  React.useEffect(() => {
    let alive = true;
    fetch('media/figma/pub-cta-hexfield.svg').then((r) => r.text()).then((txt) => {
      if (!alive) return;
      const out = []; const re = /<path\b([^>]*)>/g; let m;
      while ((m = re.exec(txt))) {
        const attrs = m[1], dm = /\bd="([^"]+)"/.exec(attrs), fm = /\bfill="([^"]+)"/.exec(attrs);
        if (dm && fm && fm[1].toUpperCase() === '#FAC9B9') out.push(dm[1]);
      }
      setPaths(out);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return (
    <svg className="gh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gh-hexgrad" gradientUnits="userSpaceOnUse" x1={W * 0.12} y1={H * 0.30} x2={W * 0.92} y2={H * 0.80}>
          <stop offset="0" style={{ stopColor: 'var(--prev-ember)' }} />
          <stop offset="1" style={{ stopColor: 'var(--prev-blue)' }} />
        </linearGradient>
      </defs>
      <g fill="var(--warm-100)">{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function TcHero() {
  return (
    <section id="tc-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><TcHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>Legal</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">Terms &amp; Conditions</h1>
        <p className="gh-sub" data-reveal data-reveal-delay="1">The Publisher Agreement below governs your participation on the Involve Asia network.</p>
      </div>
      <style>{`
        .gh-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(44px,8vh,92px) 0 clamp(16px,2.4vh,30px); text-align:center; }
        .gh-honey{ position:absolute; left:0; top:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .gh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:1;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%);
          mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%); }
        .gh-hexfield .hx{ fill-opacity:.9; }
        .gh-wrap{ position:relative; z-index:1; }
        .gh-eyebrow{ display:inline-block; font:700 14px/1 var(--font-body); letter-spacing:.02em; color:var(--warm-900); }
        .gh-title{ margin:16px auto 0; max-width:840px; font-size:clamp(30px,4.8vw,56px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .gh-sub{ margin:20px auto 0; max-width:760px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:600px){ .gh-sec{ text-align:left; } .gh-title, .gh-sub{ margin-left:0; } .gh-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

/* ---------- Content data (verbatim from involve.asia/terms-conditions/) ----- */
const TC_PREAMBLE = [
  `This Publisher Agreement will govern your participation on the Involve Asia network. By clicking the “Accept” or similar acceptance box in any other language, you agree that the effective date of this Agreement is the date on which you click “Accept”.`,
  { strong: true, t: `PUBLISHER AGREEMENT` },
  { strong: true, t: `This Publisher Agreement is between you (“you” or “Network Publisher”) and Involve Asia Technologies Sdn. Bhd. and its group of Companies (“Involve Asia”). If you have registered for or on behalf of an entity you are deemed to have accepted this Agreement on behalf of that entity. Both parties shall hereinafter be referred to collectively as “Parties” and singularly as “Party”, as the context may require.` },
  `In consideration of the mutual covenants and agreements contained herein and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties, intending to be legally bound and agree as follows:`,
];

const TC_DEFS = [
  [`“Advertiser”`, `means any person that owns or operates a Site and/or other business that can acquire customers or other types of end users by way of the internet.`],
  [`“Content”`, `means information, data, text, documents, software, music, sound, photographs, graphics and video.`],
  [`“End User”`, `means an actual or potential consumer.`],
  [`“Engagement”`, `means any type of agreement or arrangement between you and a Network Advertiser, or in some cases, an agreement or arrangement between you and Involve Asia acting on its own behalf, that can be initiated or performed on or in relation to the internet, including affiliate marketing, performance based linking and online-to-offline tracking of Transaction(s).`],
  [`“Intellectual Property Rights”`, `means technology, templates, designs, Sites, domains, methodologies, processes, names, strategies, marks, logos, Content, documentation, training manuals, and other materials, as well as any and all patent, trade secret, trademark, copyright, moral rights, database rights and other intellectual property and proprietary rights, whether or not registered, therein and thereto.`],
  [`“Interest-Based Advertising”`, `means each of (i) the collection of data across multiple digital properties or other sources for the purpose(s) of profiling and delivering advertising based on preferences or interests known or inferred from the data collected; and (ii) the collection of data about a user’s activity on or in one digital property or source for the purpose(s) of profiling and delivering advertising based on that data on a different digital property. You will also agree to the following, but not limited to, practices in regards to data and privacy policies:-`, [
    `(i) You will not collect, use or store any information or data about an end user without first obtaining that end users express authorization in accordance with data privacy laws applicable to you;`,
    `(ii) Any use by you of Qualifying Link(s) as described in this Agreement shall comply with data privacy laws applicable to you; and`,
    `(iii) You will obtain the express authorization of end users to collect, use or share that end users’ data, including authorization to use third parties to collect, use or share such information on your behalf.`,
  ]],
  [`“Link”`, `means any software, software code, programming or other technology or method (or any combination of the foregoing) that (a) creates a hyperlink between two Sites, or (b) otherwise causes a Web enabled device to display to its user a “banner,” “button,” text-mention, word, phrase, logo or other textual or graphical material that, when activated by an end user, results in another Site being served to such person or such person being able to electronically access, receive or obtain Content, products, services or other Offering(s) from the linked Site.`],
  [`“Network”`, `means the online affiliate marketing network operated by Involve Asia through which Network Publisher(s) may enter into Engagements.`],
  [`“Network Advertiser”`, `refers to an Advertiser that participates in the Network and, through such participation and use of the appropriate Offering(s), desires or seeks to recruit Network Publisher(s) to enter into Engagements.`],
  [`“Network Publisher”`, `means a person that participates in the Network and, through such participation and use of the appropriate Offering(s), desires or makes itself available to be recruited or to enter into Engagements to display, distribute or place Qualifying Link(s) for a fee.`],
  [`“Network Publisher Account”`, `means the dashboard provided by Involve Asia Technologies for accessing Offering(s) information from Network Advertiser(s).`],
  [`“Network Publisher Related Account” or “Related Account”`, `means the multiple accounts created within the dashboard provided by Involve Asia Technologies for accessing Offering(s) information from Network Advertiser(s) that are unmistakably associated with the same Network Publisher. The association may be determined through shared identification details, including but not limited to the bank account information, or other corroborative factors.`],
  [`“Offering”`, `means offering provided by Involve Asia or any Involve Asia Related Parties in the form of technology, software, reports and databases, customer support, account management and other client services, symposia, summits and other educational and networking events, as well as any other tools, services, and other resources that may be provided or otherwise made available from time to time.`],
  [`“Platform Data”`, `means all data and statistics associated or generated in connection with the Network or Offering(s), but excluding any data provided directly by you.`],
  [`“Prohibited Activity”`, `means any of the following activities: (a) discrimination on the basis of race, ethnicity, gender, religion, sexual orientation, age or disability or any other unlawful basis under applicable law; (b) libelous, defamatory, threatening, harassing, tortious, or similarly abusive activities; (c) obscene, pornographic, sexually explicit or similar activities; (d) illegal gambling; (e) sale, export or use of illegal substances; (f) terrorism, sedition or other illegal activities; (g) offering of any MP3, MPEG and/or other proprietary materials for download, sale or otherwise, in any case without the permission of the owner of the Intellectual Property Rights or otherwise infringing the Intellectual Property Rights of any third party; (h) a conflict or violation of any law, rule, regulation, self-regulatory principles, Your privacy policy, or any Intellectual Property Rights or other rights of any person or entity; (i) harm to minors in any way; or (j) fraudulent activities or impersonation of any person, including any Involve Asia(or Involve Asia Related Parties) representative, or misrepresentation of affiliation with any person.`],
  [`“Qualifying Link”`, `means any type or format of link that is provided or authorized by Involve Asia to be displayed, distributed or placed on or by a Site pursuant to an Engagement and which, through addition and/or use of any technology and/or methodology, can be tracked so that such Involve Asia or a Network Advertiser can monitor the impressions, click-throughs and/or other Transaction(s) achieved by the display, distribution and/or placement of such link. The term “Qualifying Link” shall also refer to any equivalent link, mechanism or technology that, upon being activated, causes the same result as clicking on a Qualifying Link.`],
  [`“Involve Asia Related Parties”`, `means the corporate affiliates and contractors, licensors, licensees and suppliers of each Involve Asia Service Provider.`],
  [`“Site”`, `means, as the context requires, either (a) one or more Web pages, database, computer files, emails, scripts, software or other application, or other destination, together with supporting files and programming, that are on, provided, or accessible through the Web or works on or in relation to the Web, or (b) a person owning or operating any such Site, or (c) both. A person that owns or operates a Site may have offline businesses which would not preclude it from being a Site for the purposes of this Agreement.`],
  [`“Transaction”`, `means any type of pre-agreed or predefined activity or result that is sought by an Advertiser in relation to a Qualifying Link which may include, by way of example, click-throughs, the sale of products or services, the downloading of software, files or other items, the completion of an application, sale, registration or other form, membership enrolment, or any other kind of action, transaction or activity that can be tracked and reported upon.`],
  [`“Transaction Date”`, `means the conversion date of the Transaction(s).`],
  [`“Web” or “internet” or “online”`, `means the global computer network currently referred to as the internet, including the World Wide Web, and any and all successor networks, irrespective of what wired, wireless or otherwise connected device, platform or technology is used to access it`],
];

const TC_SECTIONS = [
  { n: 1, title: `Joining the Network`, blocks: [
    `1.1 Registration. To use (or continue to use) the Network (as defined below) as a Network Publisher (as defined below), you agree to provide Involve Asia with truthful, accurate, current and complete registration information.`,
    `1.2 Accurate Registration Information. Involve Asia has the rights to verify the truth and accuracy of any registration information at any time. You undertake the responsibility to maintain and update any changes to the information provided by you to keep such information as accurate, current and complete. Please be advised that if any information provided by you is determined by Involve Asia to be misleading, inaccurate or untruthful, Involve Asia has the right to restrict, deny or terminate your account and/or your access and use of the Offering(s) (as defined below).`,
    `1.3 Participation. To join the Network, you must be either an entity or an individual who is at least 18 years old. You shall be responsible for all cost and expense for your own computer equipment and internet access.`,
    `1.4 USE OF THE NETWORK. IF YOU HAVE REGISTERED IN YOUR PERSONAL CAPACITY, YOU HEREBY ACKNOWLEDGE THAT SERVICES MADE AVAILABLE BY INVOLVE ASIA TO NETWORK PUBLISHER(S) ARE PROVIDED FREE OF CHARGE AND SOLELY FOR THE PURPOSE OF FACILITATING BUSINESS TRANSACTIONS AND YOU AGREE THAT YOU WILL ONLY USE THE NETWORK SOLELY FOR THE PURPOSE OF FACILITATING BUSINESS TRANSACTIONS FOR YOUR BUSINESS AND FOR NO OTHER PURPOSE. YOU FURTHER AGREE THAT WHEN USING THE NETWORK, YOU ARE ENGAGED IN BUSINESS ACTIVITY AND ARE NOT ACTING AS A CONSUMER.`,
  ]},
  { n: 2, title: `Defined Terms`, blocks: [
    `2.1 The following terms have the meanings indicated:-`,
    { defs: TC_DEFS },
    `2.2. Words denoting person include corporations and vice versa and also include their respective heirs, personal representatives, successors in title or permitted assigns, as the case may be.`,
    `2.3 An “entity” means a sole proprietorship, corporation, partnership, limited liability company, trust, government agency or instrumentality or other entity recognized by law as a legal person separate from its owners.`,
    `2.4 The words “include,” “includes” and “including” shall be construed without limitation.`,
    `2.5 References to the singular number shall include references to the plural number and vice versa.`,
    `2.6 Words denoting one gender include the other gender and words denoting the singular include the plural and vice versa.`,
  ]},
  { n: 3, title: `Relationship of the Parties`, blocks: [
    `3.1 In addition to and without limiting your obligations under this Agreement, your participation in the Network will require that you enter into Engagement(s). In such event, the terms and conditions of the relevant Engagement will govern your relationship with the contracting party, including your use of the Qualifying Link(s) associated with that Engagement, the Transaction sought, the fee that might become payable, and any limitations or restrictions that may apply to your promotion of a Network Advertiser.`,
  ]},
  { n: 4, title: `Participation`, blocks: [
    `4.1 Subject to the terms and conditions in this Agreement, you have joined the Network as a Network Publisher and may use the Offering(s) made available to Network Publisher(s). Your participation is purely voluntarily and you may terminate your participation at any time. Neither Involve Asia nor any Network Advertiser shall be construed or deemed as having solicited, requested or procured you or your services to promote Involve Asia or any Network Advertiser or its respective trade or business, or goods, products, property, or services.`,
    `4.2 Your participation in the Network, use of any Offering(s) or receipt of payment of any fee under any Engagement shall not be construed or be deemed to be an inducement for, solicitation of you to provide any products or services to Involve Asia.`,
  ]},
  { n: 5, title: `Prohibited Activities`, blocks: [
    `5.1 In respect of or in relation to any Site (or portion thereof) used by you in connection with your participation in the Network, you may not engage in any activity that is or constitutes, or that involves, facilitates, advocates, or promotes any Prohibited Activity unless written consent from Involve Asia is obtained.`,
  ]},
  { n: 6, title: `Qualifying Link(s)`, blocks: [
    `6.1. Use of Qualifying Link(s). Each Qualifying Link used by you must include the Involve Asia tracking code. Such tracking code must be (i) in unaltered form; and (ii) in the manner and format made available or otherwise dictated by Involve Asia.`,
    `6.2 Valid Referrals Only. You will place or use Qualifying Link(s) only with the intention of delivering the agreed upon Transaction(s). You may not, nor knowingly permit any person to, activate or attempt to activate a Qualifying Link or inflate or attempt to inflate the amount of any sought-after or resulting Transaction(s), including but not limited to the use of any method or technology that does not actually deliver an end user to the destination Site associated with such Qualifying Link.`,
    `6.3 Final and Binding Determinations. Involve Asia’s determination as to whether a Transaction resulted from a Qualifying Link shall be final and binding on you.`,
    `6.4 Distribution of Qualifying Link(s).`,
    `(a) If you currently distribute, or plan to distribute, Qualifying Link(s) on, to or through Sites other than those owned or operated by you, you hereby agree:-`,
    `(i) that upon Involve Asia’s request from time to time, you will provide Involve Asia with a list of Sites that are not owned or operated by you (together with any reasonably requested information about any such Sites) where Qualifying Link(s) (and all associated materials) have been, or are planned to be distributed and/or used; and`,
    `(ii) to provide prompt and reasonable cooperation to Involve Asia pursuant to any requests, complaints, claims or other issues raised by any Network Advertiser regarding where and how such Network Advertiser(s) Qualifying Link(s) are distributed and/or used, including ceasing further distribution of such Qualifying Link(s) (and associated materials), as appropriate.`,
    `(b) You agree that you will be liable for any breach of this Agreement that results from an act or omission of any third-party Site(s) that you use to display such Qualifying Link(s).`,
    `(c) Involve Asia reserves the right to prohibit you from distributing Qualifying Link(s) to or displaying Qualifying Link(s) on third-party Site(s).`,
    `6.5 No Modification, Etc. of Qualifying Link(s). You agree that you will not modify, circumvent, impair, disable or otherwise interfere with any tracking codes and/or other technology and/or methodology required or made available by Involve Asia and/or the Network Advertiser to be used in connection with your use of any Offering(s), including the promotion and display of Qualifying Link(s). You further agree that you may not create your own Qualifying Link(s) unless specifically authorized to do so by way of written consent by the relevant Network Advertiser or Involve Asia, in which case you agree to comply with all the applicable terms and conditions of the Network Advertiser(s) or Involve Asia.`,
    `6.6 Termination of Qualifying Link(s). Involve Asia or the relevant Network Advertiser reserves the right to terminate all Qualifying Link(s) associated with any Engagement (including termination due to the expiration of a relevant Network Advertiser’s participation). You will be notified in writing of such termination and upon receipt of such notification you must remove all relevant Qualifying Link(s) of the corresponding Engagement. If a Qualifying Link(s) is not so removed, Involve Asia may redirect such link(s) as it determines in its sole discretion, with or without imposing a fee on you.`,
    `6.7 No Modification of Content. You may not modify, resize, reformat, edit or otherwise alter any Content provided by any Network Advertiser, unless expressly authorized to do so by the relevant Network Advertiser. In such event, any such modifications shall be strictly limited in accordance with such Network Advertiser(s) specific authorization.`,
    `6.8 Discontinuing Use of Qualifying Link(s). You may at any time discontinue use of Qualifying Link(s) by removing such Qualifying Link(s) from your Site without notice to Involve Asia. However, you shall still be subject to (i) the terms of the relevant Engagement; and (ii) this Agreement until you separately terminate such Engagement(s) or this Agreement.`,
  ]},
  { n: 7, title: `Report(s)`, blocks: [
    `7.1 Revisions.`,
    `(a) You will have access to Offering(s) made available to Network Publisher(s), including reports provided by Involve Asia that details the Transaction(s) generated by your Site and any corresponding fees that you have earned (for purpose of this clause 7, “Report”). In respect of this, Involve Asia reserves the right to revise any Report made available to you at any time if Involve Asia (or a Network Advertiser) believe that the Report contains an error or omission or otherwise requires an adjustment.`,
    `(b). The Report(s) provided to you and the Network Advertiser(s) are the basis for calculating the fee, if any, due to you from that Network Advertiser. You agree and acknowledge that in the event of any discrepancies arising out of your or any third party’s measurements or tracking, any such revision may affect the amount of fee to which you are entitled.`,
    `7.2 Data Furnished by Network Advertiser(s). In providing Offering(s), including giving you reports on your Transaction(s), Involve Asia relies on data provided or made available by Network Advertiser(s). Involve Asia is not obligated to confirm, and does not warrant or guarantee, the accuracy, truth or completeness of any data provided by the Network Advertiser(s).`,
    `7.3 Data Ownership. As between you and Involve Asia, you will own all data provided by you or that you independently collect through your Site(s) without the use of Offering(s) including any and all Intellectual Property Rights, title and interest related thereto. All data provided by you shall be deemed Content covered by the license granted by you under this Agreement. All Intellectual Property Rights, title and interest in or relating to the Platform Data belong to and shall remain the exclusive property of Involve Asia and shall be deemed its Content. All Content provided by Involve Asia shall be deemed to be covered by the license granted under this agreement. Except as expressly provided in this Agreement, this Agreement does not constitute an express or implied grant of any Intellectual Property Rights, including all goodwill associated therewith, to you.`,
    `7.4. Backing-up Data and Other Precautions. Data transfer, conversion, processing and storage may be subject to human and machine errors, delays, interruptions and losses. Involve Asia shall not be liable for these events and its consequences. You are solely responsible for adopting measures to limit the impact of such events, including backing up any reports or data provided to you. Involve Asia may, from time to time, with or without notice, change the time period covered, type and/or scope of current or historical data stored by Involve Asia and/or to which it provides you with access.`,
  ]},
  { n: 8, title: `Privacy`, blocks: [
    `8.1. General Compliance. You agree that you will comply with all privacy and data security laws, rules, regulations and self-regulatory principles (“Data Protection Laws”) applicable to you.`,
    `8.2 Privacy Policy.`,
    `(a). You will maintain a privacy policy on all Site(s) employed by you in connection with your participation in the Network that complies with any and all applicable Data Protection Laws. In addition, the privacy policy shall:-`,
    `(i) be linked conspicuously from such Site’s home page, with a link that contains the word “Privacy”, “Legal”, “Terms” or similar language;`,
    `(ii) in addition to the disclosures about your privacy practices, identify the collection, disclosure and use of any information of end users (including, but without limitation to, those as contemplated under this Agreement) and such other disclosures required by all applicable Data Protection Laws;`,
    `(iii) provide information on your use of (i) tracking devices, including cookies and tracking devices enabled by Involve Asia at your request on your behalf and also contain descriptions of data collection for Interest-Based Advertising; and (ii) information about the removal of cookies and other tracking devices.`,
    `(b) Your Site(s) shall offer:-`,
    `(i) an opportunity to exercise an end user’s rights and choice with respect to their personal information as required by applicable Data Protection Laws, including, but without limitation to, the ability of end users to affirmatively agree to use the of their information or opt-out of the collection or use of data on any of your Site(s); and`,
    `(ii) an easy-to-use mechanism or method that enables end users to opt out of Interest-Based Advertising.`,
    `(c) You agree that you will provide notice of data collection and use practices and the choices (including opt-out) available to visitors to your Sites, in or around Qualifying Link(s) and other advertising content.`,
  ]},
  { n: 9, title: `Your Obligations`, blocks: [
    `9.1. No Solicitation. You may not use any Offering(s) in connection with aggregating, soliciting or recruiting Network Advertiser(s), Network Publisher(s) or other Site(s) or other persons to form or join a marketing, advertising or similar network.`,
    `9.2 No Sublicense, etc. You may not sublicense, rent, lease, sell, resell, outsource or service bureau any Offering(s), and any attempt to do so shall be null and void.`,
    `9.3 No Reverse Engineering. You will not make unauthorized modifications, reverse engineer, disassemble, decompile or attempt to derive source code of any Offering(s).`,
    `9.4 No Hacking, etc. You agree not to hack, abuse, adversely interfere with, infect with viruses, worms or other malicious or destructive code, or use or cause to be used in extraordinary and unreasonable or inappropriate ways or amounts, any Offering(s), including any servers, bandwidth supply, equipment, software and other technological resources provided by Involve Asia.`,
    `9.5 No Spam. You may not use any Qualifying Link(s) in any electronic message unless (a) you have received the express written authorization of Involve Asia or the Network Advertiser to use email or other electronic messages to promote it or its Qualifying Link; and (b) any and all such electronic messages comply in all respects with this Agreement, the Network Advertiser(s) terms and conditions, and any and all applicable foreign, national, federal, state, local or provincial laws prohibiting or restricting the delivery of unsolicited electronic communications, also known as SPAM. Further, no electronic message initiated or sent by you or on your behalf may identify Involve Asia or, except as expressly authorized by an individual Network Advertiser, any Network Advertiser as a sender or sponsor of such electronic message.`,
    `9.6 No Interference. You may not, through downloadable or other technology, replace, intercept, redirect, block, alter or otherwise interfere with the full functioning and intended actions of any Qualifying Link that has been placed or distributed by another Network Publisher including any action that would in any way prevent the behaviour or result that would occur or would have occurred had an end user activated such Qualifying Link without your interference.`,
    `9.7 No Infringing Uses. You may not use any name, trademark, service mark, domain name or other Intellectual Property Rights of any third party in connection with your use of any Qualifying Link(s), the Network or any other Offering(s), in any way or for any purpose that infringes or violates any Intellectual Property Rights or other rights of such third party, whether for the purpose of increasing the levels of Transaction(s) attributable to your Qualifying Link(s) or for any other purpose.`,
    `9.8 Fraud, Abuse, etc. You will not, and will not knowingly permit other persons to, engage in any fraudulent, abusive or illegal activity in connection with your participation on the Network or in connection with any Network Advertiser’s program or Engagement.`,
  ]},
  { n: 10, title: `Grant of License to You`, blocks: [
    `10.1 Your Use of Offering(s). Involve Asia grants to you a personal, non-exclusive, non-transferable, non-sublicensable, revocable and limited license and right, subject to the terms of this Agreement, to:-`,
    `(a) Use the Offering(s) to participate in the Network as a Network Publisher;`,
    `(b) Solely for your use in connection with your participation in the Network, access reports made available to you by Involve Asia; and/or`,
    `(c) Use any software code or other Content that is provided by Involve Asia solely for the purpose of creating and maintaining Qualifying Link(s) in accordance with the terms of this Agreement and your Engagement(s), for such purpose, and no other purpose, but only in the form so provided.`,
    `10.2 Use of the Involve Asia Name. This Agreement does not grant you any license or right to use Involve Asia’s name or any of its logos, trademarks, distinctive brand features or service names except to the extent any trade or service name is part of any code made available to you as part of a Qualifying Link. Any proposed press release or other public announcement by you regarding this Agreement or the Network or that refers to Involve Asia or any of its corporate affiliates, either directly or indirectly, shall require the prior written approval of Involve Asia. You agree that you shall not disparage Involve Asia, any Involve Asia Related Parties, the Network or any other participants thereof.`,
    `10.3 Duration of License Rights; Reservation. The license set forth in is valid only while you remain a member of the Network as a Network Publisher PROVIDED THAT you comply fully with this Agreement. Involve Asia may revoke any such license at any time by giving you notice by e-mail or in writing. Involve Asia reserves all rights that are not specifically granted to you by this Agreement.`,
  ]},
  { n: 11, title: `Grant of Licenses to Involve Asia`, blocks: [
    `11.1 Use of Your Content. Other than as provided below, in order to participate in the Network, you are not required to provide Involve Asia with any Content or other materials. Should you do so, by way of uploading, submitting, posting, displaying, delivering or otherwise making available to Involve Asia any Content and/or other materials (including any Intellectual Property Rights therein and thereto), you hereby grant to Involve Asia a non-exclusive, worldwide, royalty-free, sublicensable perpetual license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and store the same including in relation to Involve Asia’s conduct of its business or performance of any services in relation to the Network. This license authorise Involve Asia to make your Content available to the rest of the world and to let others do the same. Such additional uses by Involve Asia, or other companies, organizations or individuals, may be made with no fee paid to you with respect to the Content that you upload, submit, post, display, deliver or otherwise to Involve Asia or the Network.`,
    `11.2 Use of Your Business Contact Information. Involve Asia may use your contact information (a) for the purpose of facilitating your participation in the Network, which may include, indexing your name and relevant information about your business in the Network Publisher database, (b) making such information available to Network Advertiser(s) in furtherance of possible business relationships, (c) to facilitate payments to you, (d) to contact you generally regarding your use of the Network (and you agree to receive email and other communications regarding the Network and your participation in the Network from Involve Asia and any Involve Asia), (e) for overall benchmarking and analysis of the Network and (f) to conduct an investigation to determine if you have violated any provision of this Agreement and as part of such investigation Involve Asia may share your personal information with a third party or a law enforcement agency that needs such information in order to support such investigation.`,
    `11.3 Use of Your Name. Involve Asia will not use any of your logos and/or other trademarks without your prior written approval, except as expressly provided in this Agreement. Any and all uses of your logos and/or other trademarks shall be in accordance with your specified usage and/or brand guidelines. Nothing in this Agreement shall prevent Involve Asia from making any public or private statements about your business relationship with Involve Asia and/or any Network Advertiser and/or your participation in the Network and You agree that Involve Asia may refer to you by name in connection with the Network and/or the performance or provision of any Offering(s), including in communications sent to actual or prospective participants of the Network.`,
  ]},
  { n: 12, title: `Representations and Warranties`, blocks: [
    `12.1 You hereby represent, warrant, covenant, undertake and agree as follows:-`,
    `(a) You have the legal right to conduct any business conducted by you including in respect of any Site(s) participating in the Network and to the extent that you are an individual and of at least eighteen years of age;`,
    `(b) Any and all information you provide as part of the registration process or otherwise is and shall be truthful, accurate and complete, irrespective of any independent verification or other determination made by Involve Asia at all times;`,
    `(c) This Agreement has been duly and validly authorized, accepted, executed and delivered by you (or your authorized representative) and constitutes your legal, valid, and binding obligation, enforceable against you in accordance with its terms; and`,
    `(d) The performance by you of this Agreement and any Engagement to which you are or become a party does not and will not conflict with or violate (i) any law, rule, regulation, order, judgment, decree, agreement or instrument applicable to you; and (ii) if you are an entity, any provision of your certificate of incorporation or other organizational documents.`,
  ]},
  { n: 13, title: `Non-Disclosure`, blocks: [
    `13.1 Confidential Information. You acknowledge that in connection with your participation in the Network and/or in one or more Engagements you will be provided with confidential and proprietary data and information from time to time. Such confidential and proprietary data and information may be owned variously by Involve Asia or Network Advertiser(s) and/or its or their suppliers or contractors. Confidential Information of Involve Asia includes but is not limited to information about Transaction(s) contained in reports, non-public information about Advertiser(s) and software code made available to you by Involve Asia to facilitate your participation in the Network.`,
    `13.2 Duty of Care. You will keep Confidential Information, including reports, data and other information provided to you through the Network Publisher Account or otherwise strictly confidential. Without Involve Asia’s prior written consent, you will not disclose any such Confidential Information to any third party or use any such Confidential Information other than solely as and to the extent required for you to perform under this Agreement and/or your Engagements.`,
  ]},
  { n: 14, title: `Transaction(s)`, blocks: [
    `14.1 Involve Asia will investigate, on a best effort basis, all Transaction claims requested by you through the Network Publisher Account which are not captured as Network Publisher data. It is your obligation as a Network Publisher to provide us with any such data to assist us in our investigation with the Network Advertiser(s).`,
    `14.2 Notwithstanding clause 14.1 above a you shall provide all relevant data to us for the above mentioned Transactions through the Network Publisher Account within ninety (90) days from the Transaction Date. Subsequent to the ninety (90) days from Transaction Date, you understand and hereby agree as follows:-`,
    `(a) you shall have waived all your rights to claim for any and all sums and/or monies in relation to such Transaction(s). For the avoidance of doubt, you disclaim all rights to the same;`,
    `(b) you shall have no legal entitlement nor recourse whatsoever to any and all sums and/or monies in relation to such Transaction(s); and`,
    `(c) Involve Asia shall not be required to investigate any such Transaction(s).`,
    `14.3 Pursuant to clause 14.2 above, you agree (i) that Involve Asia shall be legally entitled to all sum/monies in relation to such Transaction(s); and (ii) to indemnify Involve Asia from all liabilities in relation to such sum/monies.`,
  ]},
  { n: 15, title: `Abuse of Network`, blocks: [
    `15.1 You shall not and shall not authorise, procure or encourage any third party to directly or indirectly generate Transaction(s) through any automated, deceptive, fraudulent or other invalid means, including but not limited to manual clicks and the use of robots.`,
    `15.2 Involve Asia reserves the right to reject such Transactions at any time without notice pursuant to clause 15.1, including but not limited to the following circumstances:-`,
    `(a) Fraud detected by Involve Asia or Network Advertisers;`,
    `(b) Violating the terms of use of the Network and Network Advertisers and the Offering(s); and/or`,
    `(c) Voided Transaction(s)as advised by Network Advertisers.`,
  ]},
  { n: 16, title: `Payments; Fees`, blocks: [
    `16.1 Network Advertiser Responsible for Payment. Except for direct Engagement(s) by Involve Asia, you acknowledge and agree that:-`,
    `(a) your entitlement to any fee reported with respect to any approved Transaction(s) (including if reported) is solely a function of the terms of your Engagement with the relevant Network Advertiser and that such Network Advertiser is solely responsible for its payment;`,
    `(b) Involve Asia is not liable or responsible for payment or collection even if Involve Asia performs the function of processing payments to you on behalf of Network Advertiser(s);`,
    `(c) your entitlement to any fee reported with respect to any approved Transaction(s) is subject to your request and provided always that:-`,
    `(i) Involve Asia has received the relevant payment from the Network Advertiser associated with the relevant Engagement. For clarity, your fee will be processed within the timeframe in accordance with the chosen withdrawal type upon your request;`,
    `(ii) the total payments received from the Network Advertiser(s) exceed the minimum amount required for the payment method; and`,
    `(iii) any other terms and conditions as may be updated from time to time by Involve Asia; and`,
    { strong: true, t: `(d) Early Payment of Transaction(s)` },
    `(i) Notwithstanding any other payment terms in this Agreement and clause 16.1(c) above (where relevant), Involve Asia may propose a settlement amount (“Settlement Amount”) for an earlier payment from Involve Asia as follows:-`,
    `(a) approved Transaction(s) by the Network Advertiser(s) and identified by Involve Asia specifically but prior to Involve Asia receiving the relevant payment from the Network Advertiser(s) associated with the relevant Engagement; or`,
    `(b) Transaction(s) pending the approval of the Network Advertiser(s) associated with the relevant Engagement but identified by Involve Asia specifically.`,
    `(ii) Such Settlement Amount shall be subject to your approval and your agreement that any such payment of the Settlement Amount shall be full and final settlement for the relevant Transactions.`,
    `(iii) In the event Involve Asia discovers that any of the approved Transaction(s) are due to (i) any automated, deceptive, fraudulent or other invalid means, including but not limited to manual clicks and the use of robots; or including but not limited to (a) fraud; (b) violation of any relevant terms and condition; and/or (c) voided Transaction(s) of approved transactions; and/or (ii) pursuant to clause 15.2, Involve Asia reserves the rights to reject any Transaction(s) approved and paid previously and such payment shall be forfeited and charged back to the account or the Related Account if necessary, in the following month.`,
    `16.2 Direct Engagement(s)`,
    `(a) All fee due to you pursuant to a Direct Engagement is ultimately and solely determined and payable by Involve Asia.`,
    `(b) It is understood that with respect to Direct Engagement(s):-`,
    `(i) you will be agreeing to terms and conditions of the Direct Engagement(s) with Involve Asia (where Involve Asia is acting as principal);`,
    `(ii) all your fee will be paid directly from Involve Asia; and`,
    `(iii) you will not have a direct relationship with the Network Advertiser.`,
    `16.3 You agree and acknowledge that all fee for any approved Transaction is subject to the terms and conditions of the relevant Network Advertiser under the applicable Engagement. For the avoidance of doubt, the fee for any approved Transaction may be subject to the terms and conditions of the relevant Network Advertiser including but are not limited to policies regarding order cancellation, returned merchandise, receipt of pending credit card authorizations and/or chargebacks and minimums for earned fee before payment is made.`,
    `16.4 Disputes. Involve Asia is under no obligation to investigate or resolve any claim or dispute involving you and any Network Advertiser or other third party person. If Involve Asia, in its sole discretion, elects to investigate or otherwise become involved in any such claim or dispute, Involve Asia shall not thereby undertake, assume or have any duty, obligation or liability to you or any other party to the claim or dispute.`,
    `16.5 Forfeited payment. Involve Asia has the rights to reject any previous approved Transactions or reject any Transaction(s) that are pending. In the event (i) payment has been made to you for such approved Transaction(s) which Involve Asia rejects, such forfeited payment shall be charged back in the account or the Related Account if necessary in the following month payments if the amount has already been paid previously; or (ii) forfeit the payments to the Network Publisher(s) without any reason whatsoever. Involve Asia has the right at any time to reverse and/or reject the entitlement of your fee in respect of any approved Transactions for whatsoever reasons including but not limited to the event whereby Involve Asia did not receive the relevant payment from the Network Advertiser.`,
    `16.6 Tax.`,
    `(a) You are required to furnish Involve Asia at [email protected] with the relevant invoice (in the format as required by law) in relation to the payment in respect of Involve Asia’s payment to you on the same day you request for payment pursuant to clause 16.1(c) above.`,
    `(b) In the event clause 16.6(a) above is not satisfied, you agree and acknowledge that:-`,
    `(i) any and all payment made to you by Involve Asia shall be net of all applicable tax(es) including but not limited to when we are required to do so by law and the authorities; and`,
    `(ii) you shall have waived all your rights to claim for any and all applicable taxes.`,
    `(c) Notwithstanding clauses 16.6(a) and 16.6(b), you agree that you are solely responsible for any and all tax obligations, if any, due to all taxing authorities arising from or in connection with any fee earned by you as a result of your participation in any Offering(s), the Network or any Engagement.`,
    `16.7 Exchange Rate Risk. In the event that Involve Asia is retained by a Network Advertiser to process payments on its behalf, you may be permitted, at Involve Asia’s sole discretion, to elect to receive payment in a currency other than the default currency for the applicable the Network Advertiser. You agree that, should you choose to do so, you will bear all risk of any fluctuations in the applicable currency exchange rate.`,
    `16.8 Amount shown in the Network. Any amount shown in the Network is just an estimation and based on the exchange rate on the day the amount is published on the Network. Such amount is for information purposes and should not be relied upon as accurate and real time. Actual amount will be based on amount received from the Network Advertiser and it may vary due to the actual rates of the currency on the date of payments. Any discrepancies in the amount will not be borne by Involve Asia.`,
    `16.9 Payments Currency. All payments will be denominated in the currency as determined by Involve Asia.`,
    `16.10 Bank fees and transaction costs. In the event that Involve Asia is retained by a Network Advertiser to process payments on its behalf, you acknowledge that bank fees and transaction costs may be applicable depending on the country of origin of your bank. You agree that, you will bear all the charges for bank fees and transaction costs for payment remitted to you as part of the relevant Network Advertiser’s payment to you in participation of its Offering(s), as handled and processed by Involve Asia.`,
    `16.11 Bank details. It is the responsibility of the Network Publisher to provide accurate bank details for payments purposes. For the avoidance of doubt, details of the bank account you provide shall correspond to the currency as designated by Involve Asia. Involve Asia is not responsible for payments made to inaccurate accounts where you have given those details. You agree and acknowledge that all payments to Network Publisher due to inaccurate bank details will be made not later than eight (8) business days from the date the accurate bank details of the Network Publisher is given to Involve Asia in the event fee is due. An administrative fee of MYR 5.00 (Five Ringgit Malaysia) may be charged to the Network Publisher on top of the amount deducted by the bank (if any) as resulted by failed in payment due to the wrong bank account given.`,
    `16.12 You will be charged the applicable processing fee.`,
    `16.13 Category of Services For the purpose of any consumption tax, indirect tax, or service tax, the services provided by Involve Asia fall under the categories (i) Digital Marketing Services or (ii) Digital Advertising Services. The category of services may vary for each engagement depending on the required delivery or outcome. Involve Asia onward supplies the same service provided by the Publisher to the Network Advertisers without making any amendments to the service.`,
  ]},
  { n: 17, title: `Acceptance of Payment`, blocks: [
    `17.1 The specific fee payable to you will be processed when you decide to request for the specific fee payment via specified electronic mode(s).`,
  ]},
  { n: 18, title: `Compliance with Laws`, blocks: [
    `18.1 Without limiting any other provision of this Agreement (i) you and your corporate affiliates, officers, directors, employees, consultants, agents and representatives; (ii) the activities of your business; (iii) your performance under any Engagements; and (iv) your use of the Network and/or Offering(s) shall comply at all times with all applicable federal, state and foreign laws, ordinances, rules, regulations, orders, judgments and decrees.`,
  ]},
  { n: 19, title: `Termination of Network Advertiser(s)`, blocks: [
    `19.1 Any Network Advertiser’s participation in the Network may end or be suspended for a number of reasons, including expiration or early termination of the Network Advertiser’s agreement with Involve Asia. In respect of this, you may not necessarily receive any prior notice that such Network Advertiser’s participation has been suspended or terminated. In the event a Network Advertiser is terminated, Involve Asia reserves the right terminate or suspend all Qualifying Link(s) that you have with that Network Advertiser immediately or, in Involve Asia’s discretion, at any time without notice to you. In respect of this, Involve Asia shall have no obligation or liability to you due to any termination of such Qualifying Link(s) and/or the termination or suspension of any Network Advertiser.`,
    `19.2 Involve Asia reserves the right to reject and void any Transaction(s) made from Qualifying Link(s) should any Network Advertiser’s termination be due to the Network Advertiser’s liquidation or non-response.`,
  ]},
  { n: 20, title: `Disclaimer of Warranties`, blocks: [
    `20.1 AS-IS. THE NETWORK AND ANY OFFERING(S) ARE PROVIDED ON AN “AS IS”, “WHERE IS” AND “AS AVAILABLE.”`,
    `20.2 DISCLAIMER. INVOLVE ASIA AND INVOLVE ASIA RELATED PARTIES, TO THE EXTENT PERMITTED BY APPLICABLE LAW, HEREBY DISCLAIMS ANY ALL WARRANTIES , EXPRESS OR IMPLIED, INCLUDING ANY WARRANTY AS TO ACCURACY, ADVERTISERABILITY, COMPLETENESS, CURRENTNESS, SECURITY, NON-INFRINGEMENT, TITLE, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OF THE NETWORK OR ANY OFFERING(S) OR THAT YOUR USE OF THE SAME WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY QUALIFYING LINK(S) OR NETWORK ADVERTISER WILL BE AVAILABLE OR CAN OR WILL BE WILLING TO ENTER INTO ANY ENGAGEMENT WITH YOU.`,
  ]},
  { n: 21, title: `Limitation of Liability`, blocks: [
    `21.1 INVOLVE ASIA WILL NOT BE LIABLE FOR ANY EXEMPLARY, PUNITIVE, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL OR SPECIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT AND INVOLVE ASIA MAKES NO (AND HEREBY DISCLAIMS AND NEGATES ANY AND ALL) WARRANTIES OR REPRESENTATIONS WHATSOEVER, EXPRESS OR IMPLIED, WITH RESPECT TO THE NETWORK AND ANY INVOLVE ASIA OFFERING(S). IN NO EVENT WILL THE COMPANY OR ANY OF ITS AFFILIATES BE LIABLE TO ANY OF THE PERSONS USING THE NETWORK AND OFFERING(S) OR TO ANY OTHER PERSON FOR ANY ERROR IN THE NETWORK, EXCEPT TO THE EXTENT THAT SUCH EXEMPLARY, PUNITIVE, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL OR SPECIAL DAMAGES ARE PAID BY THE PARTY INCURRING SUCH DAMAGES TO A PERSON THAT IS NOT A PARTY TO THIS AGREEMENT. In respect of this, you further agree to waive all special, indirect, exemplary, punitive, direct and consequential damages against IA. These terms will not limit any non-waivable warranties or consumer protection rights that you may be entitled to under the laws of your country of residence and Malaysia.`,
  ]},
  { n: 22, title: `Indemnification`, blocks: [
    `22.1 You agree to defend, indemnify and hold harmless Involve Asia and Involve Asia Related Parties, and its and their directors, officers, employees, agents, subcontractors, affiliates and representatives from and against any and all claims, actions, demands, liabilities, losses, damages, proceedings, suits, penalties, interest, judgments, settlements, costs and expenses (including reasonable lawyers’ fees) that directly or indirectly arise out of or are based on (a) any breach of your obligations under this Agreement including a breach of any representation, warranty, or covenant made by you in this Agreement; (b) you engaging in any Prohibited Activity; (c) any breach by you of any Engagement, (d) any violation by you of any law, regulation or rule; (d) your inappropriate use of any other Offering(s); (e) your negligence or willful misconduct; (f) any actual or alleged infringement by you of any Intellectual Property Rights or other rights of any person; and/or (g) your breach of any law or any rights of a third party.`,
  ]},
  { n: 23, title: `Amendments`, blocks: [
    `23.1 Involve Asia reserves the right to amend and/or update the terms herein including any Network Policies and Guidelines at any time without notice to you. YOUR CONTINUED USE OF THE NETWORK AND/OR INVOLVE ASIA OFFERING AFTER EXPIRATION OF ANY APPLICABLE PRIOR NOTICE PERIOD SHALL CONSTITUTE YOUR ACCEPTANCE AND SUCH AMENDMENT SHALL BE BINDING AND LEGALLY ENFORCEABLE ON YOU. IF YOU DO NOT WISH TO ACCEPT ANY SUCH AMENDMENT, THEN YOU MUST TERMINATE YOUR ACCOUNT IN THE NETWORK AND CEASE USING THE NETWORK AND ANY ASSOCIATED OFFERING OR ENGAGEMENT.`,
    `23.2 Changes in Service. Involve Asia reserves the right to amend, add, remove, suspend or discontinue any aspect of the Network or any other Involve Asia Offering with or without any prior notification of changes. YOUR CONTINUED USE OF THE NETWORK AND/OR INVOLVE ASIA OFFERING AFTER EXPIRATION OF ANY APPLICABLE PRIOR NOTICE PERIOD SHALL CONSTITUTE ACCEPTANCE AND SUCH AMENDMENT SHALL BE BINDING AND LEGALLY ENFORCEABLE ON YOU. IF YOU DO NOT WISH TO ACCEPT ANY SUCH CHANGE, THEN YOU MUST TERMINATE YOUR ACCOUNT IN THE NETWORK AND CEASE USING THE NETWORK AND ANY ASSOCIATED OFFERING OR ENGAGEMENT.`,
  ]},
  { n: 24, title: `Restricted Use`, blocks: [
    `24.1 Involve Asia reserves the right at any time, with or without notice, in its sole discretion to suspend, limit, restrict, condition or deny your access to or use of all or any part of the Network or any Involve Asia Offering.`,
  ]},
  { n: 25, title: `Termination and Deletion of Account`, blocks: [
    `25.1 Termination. In addition to any other rights or remedy at law, this Agreement, your participation in the Network and use of any other Involve Asia Offering may be terminated by either Party, at any time, with or without cause, with immediate effect unless parties agree otherwise in writing. Termination may be effected through your Network Publisher Account or by written notice to the other party subject to actual receipt thereof.`,
    `25.2 Deleting your Account. You can delete your account at any time by logging in to your profile on the Involve Asia mobile app and navigating to the Account Settings section. Once you complete the account deletion process, your personal data will be deleted from our active databases, except for some data that may be retained for strictly necessary purposes, such as record-keeping, fraud prevention, security and to ensure compliance with applicable laws and regulations. You will no longer be able to log into Involve Asia with this account, retrieve your performance reports, analytics, or related data, or recover your pending, current, or future earnings. Any sub-users under your account will also be deleted. You will no longer receive promotional emails or notifications from us. Backed-up data may be retained for a limited period, but it will be securely stored and inaccessible for any operational purposes. It is important to note that once your account is deleted, your data cannot be recovered. Ensure you have retrieved any important content or information from your account before proceeding with deletion. Please carefully read our Privacy Policy here for more information as to how your data is treated upon deletion of account.`,
  ]},
  { n: 26, title: `Effects of Termination`, blocks: [
    `26.1 Upon any termination of this Agreement and/or your participation on the Network:-`,
    `(a) You shall immediately cease to use and remove from any and all Site(s), whether or not owned or operated by you, any and all Qualifying Link(s) and all other Content or materials provided to you in connection with your participation in the Network or your use of any other Offering(s).`,
    `(b) Any and all licenses and rights granted to you under this Agreement shall immediately cease and terminate.`,
    `(c) Involve Asia may terminate or, in its sole discretion, direct or redirect to any destination Site any and all Qualifying Link(s) continued to be used by you without Involve Asia or any Network Advertiser incurring any further liability or obligation to you.`,
    `(d) Any and all confidential or proprietary information of Involve Asia (including as applicable any confidential or proprietary information of Network Advertiser(s) as and to the extent originally provided by Involve Asia) that is in your possession or control must be immediately returned or destroyed, at Involve Asia’s sole discretion. If requested, you will certify in a writing signed by you or an authorized officer as to the return or destruction of all such confidential or proprietary information.`,
  ]},
  { n: 27, title: `Inactive Account`, blocks: [
    `27.1 In the event that (i) you have not logged into your account for a continuous period of 360 (Three Hundred and Sixty) days; and (ii) there have been no Transactions recorded in your account for a continuous period of 360 (Three Hundred and Sixty) days, Involve Asia shall treat your account as inactive and notify you of the same via e-mail in which the 360 days have lapsed in the manner mentioned above. You may re-activate your account by either (i) generating 1 (one) Transaction through your account; or (ii) logging into your account, within a period of 30 (thirty) days from being notified by Involve of your account becoming inactive.`,
    `Failure to do so would result in your account being frozen by Involve Asia and as a result thereof, an administration fee equivalent to the lower of MYR 100.00 (100 Malaysian Ringgit) or the balance available for drawdown, shall be deducted. Furthermore, any balance funds available in your account shall be forfeited without further notification to you and you hereby waive any rights, claims or disputes against Involve Asia in this regard.`,
    `In the event your account remains frozen for a period of 3 (three) years from the date of freezing with no action is taken from your end as stated above, your account shall be deleted by Involve Asia and the consequences of deletion of account as stipulated in Clause 25.2 of this Publisher Agreement will follow.`,
  ]},
  { n: 28, title: `Miscellaneous`, blocks: [
    `28.1 Independent Contractors. The relationship between you and Involve Asia is purely contractual based on this Agreement and nothing in this Agreement shall confer upon either party any authority to obligate or bind the other in any respect or cause either party to have a fiduciary relationship to the other between you and Involve Asia and Involve Asia Related Parties. Neither Party shall have any right, power or authority to assume, create or incur any expense, liability or obligation, express or implied, on behalf of the other. All rights and remedies of the Parties to this Agreement are set out exhaustively in this terms and conditions herein. The Parties shall not have any other rights, obligations and liablities whatsoever beyond the terms and conditions herein.`,
    `28.2 Force Majeure. Neither Party shall be liable to you by reason of any failure or delay in the performance of its obligations hereunder on account of strikes, shortages, riots, insurrection, fires, flood, storm, explosions, acts of God, war, governmental action, strikes, lockouts or other industrial disputes, earthquakes, interruptions in telecommunications services or internet facilities, or any other cause which is beyond the reasonable control of either Party, whether or not similar to the foregoing. In case of such events, the time for performance required by either Party under this Agreement shall be extended for any period during which the performance is prevented by the event. However, the other Party may terminate this Agreement by notice if such event preventing performance continues for more than thirty (30) days.`,
    `28.3 Assignability. You shall not assign or delegate any of the rights or obligations under this Agreement without prior written consent from Involve Asia. All such assignment and delegation shall be void and invalid. This Agreement is binding on and inures to the benefit of the respective successors, heirs and assigns of the Parties.`,
    `28.4 Severability. If any term of this Agreement is held by a court with jurisdiction to be invalid or unenforceable, the said term shall be severed or amended in such manner as to render the remainder of this Agreement valid and enforceable. If any term of this Agreement shall be judicially unenforceable in any jurisdiction, such term shall not be affected with respect to any other jurisdiction.`,
    `28.5 Disputes and Governing Law.`,
    `(a) This Agreement shall be governed by and construed in accordance with the laws of Malaysia.`,
    `(b) The Parties hereto shall endeavour to settle all dispute, controversy or claim which may arise out of or relating to this Agreement by appointing representatives to meet in good faith within thirty (30) days from a request by either party to resolve the dispute. In the event the Parties hereto fail to reach an amicable settlement such disputes, controversies or claims shall be finally referred to the exclusive jurisdiction of the Malaysian Courts.`,
    `28.6 Entire Agreement; Third Party Beneficiaries. This Agreement is the entire agreement between the parties pertaining to its subject matter, and supersedes all prior written or oral agreements (including prior versions of this Agreement and any conflicting confidentiality agreements), representations, warranties or covenants between the parties with respect to such subject matter. You have not relied on any representation, warranty, collateral contract or other assurance (except those set out in this Agreement) made by or on behalf of Involve Asia before you entered into this Agreement, and you waive all rights and remedies which, but for this clause, might otherwise be available to you in respect of any such representation, warranty, collateral contract or other assurance. There are no third-party beneficiaries of this Agreement.`,
    `28.7 Heading. The headings of sections or other subdivisions of this Agreement will not affect in any way the meaning or interpretation of this Agreement.`,
    `28.8 Language. This Agreement may be translated into different language versions. In the event of any inconsistency and, except as provided by applicable law, the English language versions of this Agreement and Network Policies is the original language and all other language versions is a translation for information purposes only. The English language versions of this Agreement and Network Policies prevail and be binding on Parties.`,
  ]},
];

/* ---------- Renderers ------------------------------------------------------ */
function TcBlock({ item }) {
  if (item && item.defs) {
    return (
      <dl className="tc-defs">
        {item.defs.map(([term, def, sub], i) => (
          <div className="tc-def" key={i}>
            <dt className="tc-dt">{term}</dt>
            <dd className="tc-dd">
              {def}
              {sub && sub.map((s, j) => <span className="tc-defsub" key={j}>{s}</span>)}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  const t = typeof item === 'string' ? item : item.t;
  const strong = typeof item === 'object' && item.strong;
  const indent = /^\(/.test(t);
  return <p className={'tc-p' + (indent ? ' tc-in' : '') + (strong ? ' tc-b' : '')}>{t}</p>;
}

function TcContent() {
  return (
    <section id="tc-content" className="tc-sec">
      <div className="wrap tc-wrap">
        <div className="tc-preamble" data-reveal>
          {TC_PREAMBLE.map((b, i) => <TcBlock item={b} key={i} />)}
        </div>
        {TC_SECTIONS.map((sec) => (
          <div className="tc-block" key={sec.n} data-reveal>
            <h2 className="tc-h">{sec.n}. {sec.title}</h2>
            {sec.blocks.map((b, i) => <TcBlock item={b} key={i} />)}
          </div>
        ))}
      </div>
      <style>{`
        .tc-sec{ background:var(--warm-50); padding:clamp(28px,4vh,52px) 0 clamp(72px,12vh,140px); }
        .wrap.tc-wrap{ max-width:880px; }
        .tc-preamble{ padding-bottom:clamp(20px,3vh,32px); border-bottom:1px solid var(--warm-200); }
        .tc-block{ margin-top:clamp(38px,5.5vh,60px); }
        .tc-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(19px,2.1vw,25px); line-height:1.2; letter-spacing:-.02em; color:var(--warm-900); padding-bottom:14px; border-bottom:1px solid var(--warm-200); }
        .tc-p{ margin-top:15px; font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); }
        .tc-block .tc-h + .tc-p{ margin-top:18px; }
        .tc-b{ font-weight:700; color:var(--warm-900); }
        .tc-in{ padding-left:clamp(14px,2vw,26px); }
        .tc-defs{ margin-top:18px; display:flex; flex-direction:column; gap:16px; }
        .tc-dt{ font:700 15.5px/1.6 var(--font-body); color:var(--warm-900); }
        .tc-dd{ margin:5px 0 0; font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); }
        .tc-defsub{ display:block; margin-top:9px; padding-left:clamp(14px,2vw,26px); }
      `}</style>
    </section>
  );
}

function TermsApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <TcHero />
        <TcContent />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TermsApp />);
