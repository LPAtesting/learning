/* DealCraft — question rewrites (Oct 2026).
   Replaces questions that tested bare section or rule numbers (pure recall) with applied versions:
   options and match targets now carry the legal meaning, with the citation as a label.
   Loaded after the bundles; the app merges each entry over the question with the same id. */
(function(){
var B=window.DC_BANK=window.DC_BANK||{};
function R(t,w){ return {t:t,correct:true,why:"Correct. "+w}; }
function W(t,w){ return {t:t,correct:false,why:/^(Wrong|Incomplete)/.test(w)?w:"Wrong. "+w}; }
function P(l,r){ return {l:l,r:r}; }
B._fix=Object.assign(B._fix||{},{

"p2x-E2-01":{type:"order",pairs:undefined,
 prompt:"A company under judicial management needs new money. Put the rescue-financing protections the court can grant under IRDA s 67 in order, from least to most intrusive for existing creditors.",
 steps:["Treated as part of the costs and expenses of the winding up (s 67(1)(a))","Priority over preferential debts and all unsecured debts (s 67(1)(b))","Security over unencumbered property, or a subordinate security (s 67(1)(c))","Security equal to or above existing security, if those creditors are adequately protected (s 67(1)(d))"]},

"rF-6-04":{prompt:"SellerCo sells its logistics division to BuyCo as a going concern. What normally happens to the 200 employees who work in that division?",
 options:[R("They move to BuyCo automatically on their existing terms, with notification and consultation (s 18A Employment Act)","On a going-concern business transfer, s 18A carries the affected employees to the new owner by operation of law, with continuity of employment."),
  W("SellerCo dismisses them and BuyCo rehires whoever it wants","s 18A exists to avoid mass dismissal: employees transfer automatically on a going-concern transfer."),
  W("The Take-Over Code decides, because control of a business is changing","The Code governs offers for public companies, not the transfer of employees on a business sale."),
  W("They stay with SellerCo; employees never move on an asset sale","On a going-concern transfer they typically do move, under s 18A.")]},

"c7x-026":{prompt:"Is the loan binding on Sage, and what protects the bank?",
 options:[R("Yes. s 25A removes deemed notice of the constitution, and s 25B(1) frees the board's power from constitutional limits for a good-faith lender","The issue is not capacity but a limit on the directors' power. Under s 25A the bank is not taken to know of the limit; under s 25B(1) the limit does not bind a person dealing in good faith."),
  W("No. The limit is in a public document the bank should have read","s 25A specifically removes the deemed notice that would have followed from failing to read it."),
  W("Yes, but only because s 41 validates pre-incorporation contracts","Sage was already incorporated, so s 41 is irrelevant."),
  W("Yes, because borrowing is within Sage's capacity under s 23(1), so the limit is irrelevant","Capacity is not the issue: the limit is on the directors' authority, which ss 25A and 25B deal with.")]},

"cl1-028":{prompt:"Match each situation to how the Companies Act treats the constitution.",
 pairs:[P("The constitution restricts requisitions; members with 10% ask the directors for an EGM","Still effective: s 176 applies notwithstanding the constitution"),
  P("The articles set a lower threshold for members calling a meeting themselves","The lower number applies (s 177)"),
  P("The company wants to send notices and reports to members by email","Electronic communications rules (ss 387A–387C)"),
  P("The company wants a hybrid AGM; its constitution is silent","Allowed without first amending the constitution (s 173J)")]},

"cl4-028":{prompt:"Match each situation involving a registered foreign company to what the Act requires.",
 pairs:[P("A creditor wants to serve papers at its Singapore office during business hours","Office open to the public at least 5 hours each business day (s 370(1))"),
  P("All of its directors live overseas","At least one authorised representative resident in Singapore (s 368(1)(e))"),
  P("A Singapore investor wants to see its finances","It must lodge its latest financial statements (s 373)"),
  P("Singapore-resident members ask for a local register","Keep a branch register for them on request (s 379)")]},

"c5x-063":{prompt:"Match each shareholder's problem to the statutory route the Companies Act gives.",
 pairs:[P("The majority pay themselves large fees and shut a minority out of management","Remedy for oppressive or unfairly prejudicial conduct (s 216)"),
  P("Directors diverted company money and the board refuses to sue","Leave to bring a derivative action for the company (s 216A)"),
  P("The company is deadlocked and can no longer function","Apply to wind up, e.g. on the just and equitable ground (s 254(1))"),
  P("The directors are about to do something the Act prohibits","Injunction to restrain a contravention of the Act (s 409A)")]},

"cl7-050":{prompt:"Match each situation to the Companies Act provision that resolves it.",
 pairs:[P("A new company's constitution has no objects clause. Can it enter any business?","Yes: full capacity to carry on any business (s 23(1))"),
  P("A company acts outside its objects clause and the counterparty wants out","Not invalid merely because of incapacity (s 25(1))"),
  P("A lender never read the company's constitution","No constructive notice of the constitution (s 25A)"),
  P("Directors exceed a borrowing limit in the constitution; the lender acts in good faith","The limit does not bind the lender (s 25B(1))")]},

"cl8-019":{prompt:"Match each situation to the rule on general meetings that answers it.",
 pairs:[P("An ordinary AGM needs to be called","The board convenes it, as it does most meetings"),
  P("Members with 10% of paid-up voting shares want an EGM; the board is unwilling","Requisition the directors to call it (s 176)"),
  P("Two members holding 10% of issued shares want to call it themselves","They can convene it directly (s 177)"),
  P("A member with one share asks whether he may attend and speak","Yes: every member may attend and speak (s 180(1))")]},

"cl8-039":{prompt:"Match each meeting problem to the part of s 392 that deals with it.",
 pairs:[P("The quorum was briefly lost, but no one was prejudiced","Valid unless the court finds substantial injustice (s 392(1)–(2))"),
  P("The video link drops for some members at a hybrid AGM","Technology-failure rule for virtual or hybrid meetings (s 392(2A))"),
  P("One member's notice was accidentally never sent","Accidental omission or non-receipt of notice (s 392(3))"),
  P("A contravention that is also an offence needs curing","Apply to court for a validation order (s 392(4)–(6))")]},

"cl10-037":{prompt:"Match each problem with a s 216A leave application to the requirement it engages.",
 pairs:[P("He applies to court the day after writing to the board","Give the directors 14 days' notice first (s 216A(3)(a))"),
  P("A rival shareholder wants the action mainly to harass the company","The complainant must act in good faith (s 216A(3)(b))"),
  P("The claim would cost far more than it could ever recover","Must appear prima facie in the company's interests (s 216A(3)(c))"),
  P("Limitation expires next week, leaving no time to give notice","The court may make an interim order without notice (s 216A(4))")]},

"c14x-093":{type:"mcq",pairs:undefined,
 prompt:"To secure a loan, Kite Pte Ltd charges (i) its book debts, (ii) a patent it owns, (iii) shares it holds in its subsidiary and (iv) its uncalled share capital. Which charges must be registered under s 131(3)?",
 options:[R("All four: each falls in a category listed in s 131(3)","Book debts are para (f), patents and other IP para (j), shares in a subsidiary para (c) and uncalled share capital para (b)."),
  W("Only (i) and (ii); charges over shares and capital are never registrable","Paras (b) and (c) expressly cover uncalled share capital and shares in a subsidiary."),
  W("Only (i), because only charges over book debts are registrable","s 131(3) lists many categories, including all four here."),
  W("None, so long as the charges are fixed rather than floating","s 131(3) lists categories by the asset charged; fixed charges over these assets are registrable.")]},

"tc7-019":{prompt:"Match each thing an offeree shareholder wants to know to what the offer document must contain (Rule 23).",
 pairs:[P("“I'm not sure whether I should accept.”","Prominent advice to consult a professional adviser (Rule 23.1)"),
  P("“What's the price, what are the conditions, and will they squeeze me out?”","Price, all conditions, last unconditional day and compulsory-acquisition intention (Rule 23.5)"),
  P("“Do I keep the dividend that has just been declared?”","Whether the securities are acquired cum or ex dividend (Rule 23.11)"),
  P("“What protections do I have on timing, acceptances and comparable offers?”","The rights under Rules 18, 22 and 28, written into the document (Rule 23.13)")]},

"tc7-032":{prompt:"Match each fact about the offeree company to the disclosure its board circular must make (Rule 24).",
 pairs:[P("The offeror says it will close the target's main factory","The board's comments on the offeror's plans for the company and its employees (Rule 24.2)"),
  P("Two years ago, outside the ordinary course, it signed a large contract with a director's company","Material contracts with interested persons in the 3 years before the offer period (Rule 24.6)"),
  P("The CEO's service contract has 30 months to run","Directors' service contracts with more than 12 months to run (Rule 24.7)"),
  P("A director will be paid to step down if the offer succeeds","Compensation for loss of office in connection with the offer (Rule 24.8)")]},

"ethics.u1.l1.q08":{type:"mcq",accept:undefined,
 prompt:"A client tells his lawyer not to mention a recent decision that hurts his case. The lawyer feels pulled between client and court. Under the PCR's guiding principles of interpretation (rule 4), which duty wins?",
 options:[R("The duty to the court, which is paramount and takes precedence over the duty to the client","Rule 4's first principles set the hierarchy of duties: the paramount duty is to the court."),
  W("The duty to the client, because the lawyer acts as the client's agent","The client's instructions cannot override the duty to the court."),
  W("Whichever the client chooses once properly advised","The hierarchy is fixed by rule 4; the client cannot waive the duty to the court."),
  W("Neither; the lawyer must stop acting at once","Rule 4's hierarchy resolves the conflict; it does not force automatic withdrawal.")]},

"ethics.u1.l1.q09":{prompt:"Match each lawyer's situation to the ground of due cause under s 83(2) LPA.",
 pairs:[P("Convicted of cheating in the State Courts","Conviction of a criminal offence (s 83(2)(a))"),
  P("Forged a client's signature on a court document","Fraudulent or grossly improper conduct in professional duty (s 83(2)(b))"),
  P("Acted dishonestly in a private deal, but was never prosecuted","Misconduct unbefitting an advocate and solicitor (s 83(2)(h))"),
  P("Struck off the roll in Australia","Disciplined as a lawyer in another jurisdiction (s 83(2)(k))")]},

"ethics.u1.l1.q12":{prompt:"A solicitor is adjudicated bankrupt and is in breach of the specified provisions of the Insolvency, Restructuring and Dissolution Act. Which ground of due cause under s 83(2) LPA is engaged?",
 options:[W("Conviction of a criminal offence (s 83(2)(a))","Bankruptcy is not a criminal conviction, although some insolvency-related acts may be offences in their own right."),
  R("Bankruptcy coupled with breach of the specified IRDA provisions (s 83(2)(c))","Bankruptcy alone is not the trigger; it is bankruptcy plus breach of the specified provisions."),
  W("Accepting work through a proclaimed tout (s 83(2)(f))","Nothing in the facts involves a tout."),
  W("Carrying on a business incompatible with the profession (s 83(2)(i))","Being bankrupt is not carrying on a trade, business or calling.")]},

"ethics.u1.l1.q18":{prompt:"A law practice has no system for supervising its practice trainees and runs its office loosely. Under rule 3 PCR, which Part of the Rules sets the standards it is failing?",
 options:[W("Part 2: core duties in practising law, such as honesty, competence and confidentiality","Part 2 governs the practice of law generally, not the management of the practice."),
  W("Part 3: conduct of proceedings, client money, fees and conflicts","Part 3 does not govern office management or trainee supervision."),
  R("Part 4: management and operation of the practice, including responsibilities to practice trainees","Part 4 applies to every law practice and covers exactly these responsibilities."),
  W("Part 5: outside businesses, touting, referrals and publicity","Part 5 is about marketing and outside businesses, not internal management.")]},

"ethics.u1.l3.q04":{type:"mcq",accept:undefined,
 prompt:"A new client phones and asks a solicitor to start proceedings urgently. The solicitor files without any written authority from the client. What has he failed to obtain?",
 options:[R("A warrant to act: the client's written authority, which every solicitor representing a litigant must obtain (O 64 r 7 ROC)","The course materials cite O 64 r 7 ROC with Law Society Practice Direction 7.4.3D."),
  W("Nothing: oral instructions are enough to start proceedings","A warrant to act is required for every solicitor representing a litigant or prospective litigant."),
  W("Leave of court to act for the client","No leave is needed; the requirement is the client's written authority."),
  W("A Law Society endorsement for that court","The requirement is a warrant to act from the client.")]},

"ethics.u1.l4.q02":{options:[W("Conviction of a criminal offence (s 83(2)(a))","A regulatory suspension is not a conviction."),
  W("Contravention of a provision of the LPA (s 83(2)(j))","Misconduct in England is not a breach of the Singapore statute."),
  W("Only misconduct unbefitting an advocate and solicitor (s 83(2)(h))","s 83(2)(h) may be arguable, but it is not the only route: there is a dedicated limb for foreign discipline."),
  R("Disciplined as a legal practitioner in another jurisdiction (s 83(2)(k))","Being suspended as a legal practitioner in another jurisdiction is due cause under s 83(2)(k).")]},

"ethics.u1.l4.q04":{options:[W("Conviction of a criminal offence (s 83(2)(a))","The Law Society relies on the contravention itself, not on any conviction."),
  R("Contravention of an LPA provision that warrants discipline (s 83(2)(j))","s 77(3) confirms that s 77 breaches may be the subject of disciplinary proceedings."),
  W("Procuring work through a person paid to introduce it (s 83(2)(e))","Nothing in the facts involves paying for introductions."),
  W("Accepting work through a proclaimed tout (s 83(2)(f))","No tout is involved.")]},

"ethics.u2.l2.q06":{prompt:"Match each client complaint to the timely-communication duty it engages (rule 5(2) PCR).",
 pairs:[P("“I haven't heard about my case in six months.”","Keep the client reasonably informed of progress (r 5(2)(e))"),
  P("“My emails go unanswered for weeks.”","Where practicable, promptly respond to the client's communications (r 5(2)(f))"),
  P("“He didn't turn up to our meeting.”","Keep appointments with the client (r 5(2)(g))"),
  P("“His advice on the offer came after it had lapsed.”","Provide timely advice (r 5(2)(h))")]},

"ethics.u2.l2.q14":{prompt:"A client asks whether the company he is acquiring is dormant. The lawyer knows it is a defendant in ongoing litigation but says it is dormant with no liabilities. Which of his duties to the client has he breached?",
 options:[W("Only the duty to inform (r 5(2)(b)), as the problem is what he left out","Incomplete. Withholding the litigation breaches the duty to inform, but the false statement also breaches the duty of honesty."),
  W("Only the duty of honesty (r 5(2)(a)), as the problem is the false statement","Incomplete. The false statement breaches honesty, but withholding the litigation also breaches the duty to inform."),
  R("Both: the false ‘dormant’ answer breaches honesty (r 5(2)(a)) and hiding the litigation breaches the duty to inform (r 5(2)(b))","As in LSS v Ezekiel Peter Latimer."),
  W("Neither, if the claim in the litigation is small","A knowing lie is dishonest whatever the sums, and litigation is plainly information a buyer needs.")]},

"ethics.u2.l3.q04":{prompt:"Match each disclosure to the rule 6(3) PCR exception that permits it.",
 pairs:[P("The client says in writing: send my file to my accountant","The client authorises the disclosure (r 6(3)(a))"),
  P("The court orders production of the documents","Permitted or required by law, a court order or a tribunal (r 6(3)(b))"),
  P("The lawyer tells his PI insurer about a possible claim against him","In confidence to his professional indemnity insurer or broker (r 6(3)(d))"),
  P("The client complains to the Law Society and the lawyer uses the file to answer","Solely to respond to a complaint about his conduct (r 6(3)(e))")]},

"ethics.u2.l3.q07":{type:"mcq",accept:undefined,
 prompt:"A client emails his lawyer: “You may send my medical report to the insurer.” Can the lawyer disclose it?",
 options:[R("Yes, within the scope the client authorised (r 6(3)(a))","Confidentiality exists for the client's benefit, so the client can release it. Consent covers only what he authorised."),
  W("Yes, and the rest of the client's file too","Consent covers only what the client authorised."),
  W("No: confidentiality can only be lifted by court order","A court order is one exception (r 6(3)(b)); client authority is another."),
  W("Only if the disclosure is also required by law (r 6(3)(b))","Client authority is a separate exception; nothing more is needed.")]},

"ethics.u5.l2.q01":{prompt:"Match each courtroom scenario to the rule 9 PCR duty it engages.",
 pairs:[P("Tells the judge a witness is ill, knowing he is just unwilling","Must not knowingly mislead the court (r 9(2)(a))"),
  P("Quotes a judgment but leaves out the passage that limits it","Must not cite law out of context or contrary to law (r 9(2)(f))"),
  P("Knows of an adverse Court of Appeal decision but stays silent","Must inform the court of relevant decisions, even adverse ones (r 9(3)(a))"),
  P("Knows of a procedural irregularity and says nothing","Must disclose facts required by law and known irregularities (r 9(3)(b))")]},

"banking.u7.l4.q06":{options:[W("The profit test (Rule 210(2)(a)): S$10m+ pre-tax profit and a 3-year record","S$2m is below the S$10m threshold."),
  W("None; it must list on Catalist","It qualifies under a Main Board test."),
  W("The market-cap test: a market cap of S$300m+","Its expected S$180m market cap is below S$300m."),
  R("The profit and market-cap test (Rule 210(2)(b)): any profit in the latest FY, a 3-year record and a S$150m+ market cap","S$2m profit and a S$180m market cap satisfy it.")]},

"governance.u1.l2.q01":{prompt:"A shareholder argues that the CEO, not the board, has the final say on strategy because the CEO runs the business day to day. Where does the Companies Act put the power to manage the business?",
 options:[R("With the directors: the business is managed by, or under the direction or supervision of, the board (s 157A CA)","This is why the board plays the primary role in corporate governance; the CEO's authority is delegated from it."),
  W("With the audit committee, for a listed company (s 201B CA)","s 201B concerns audit committees, not the general management power."),
  W("With SGX, through the Listing Rules (s 203 SFA)","s 203 gives the Listing Rules' disclosure requirements legal force; it does not allocate management power."),
  W("With the CEO, as the person who runs the business","The CEO acts under powers the board delegates; the statutory power sits with the directors.")]},

"governance.u2.l1.q01":{prompt:"ListCo deliberately fails to announce information the SGX Listing Rules require it to disclose. On their own, the Listing Rules are only a contract with SGX. What turns the failure into a statutory offence?",
 options:[R("s 203 SFA, which gives the Listing Rules' disclosure obligations the force of law","s 203 is the bedrock of the disclosure regime, with criminal sanctions for intentional or reckless failures."),
  W("s 331 SFA, which makes officers liable for the company's offences","s 331 attaches liability to officers once there is an offence; it does not create the disclosure offence."),
  W("s 157A CA, which puts management in the board's hands","s 157A allocates management power; it says nothing about SGX disclosure."),
  W("s 199 SFA, which bans false or misleading statements","s 199 deals with false statements, not with silence.")]},

"governance.u2.l1.q07":{prompt:"Match each situation to the SFA provision it engages.",
 pairs:[P("ListCo hides a lost contract the Listing Rules require it to announce","Failure to notify SGX of required information (s 203)"),
  P("A director's press release overstates profits and is likely to move the price","False or misleading statement (s 199)"),
  P("ListCo commits an offence with its CFO's connivance","Officer's personal liability for the company's offence (s 331)")]},

"governance.u2.l1.q12":{prompt:"A director issues a press release overstating a new contract's value, not caring whether the figure is right. The share price jumps 15%. Which prohibition is most directly engaged?",
 options:[R("Making a false or misleading statement likely to move the price (s 199 SFA)","He made a statement false in a material particular, not caring whether it was true, and it was likely to (and did) affect the price."),
  W("Only a failure to disclose (s 203 SFA)","s 203 concerns failures to disclose. Here the problem is a false statement."),
  W("A breach of the audit committee rules (s 201B CA)","s 201B deals with audit committees."),
  W("Only the Listing Manual's list of specific announcements (Rule 704)","Rule 704 lists events requiring announcement; the statutory prohibition on false statements is s 199.")]},

"governance.u2.l2.q08":{prompt:"ListCo's investor relations manager emails ten fund managers a ‘preview’ saying a key contract is worth S$500m. He knows it is worth S$50m, but hopes they will buy shares. No public announcement is made. Which prohibition is most directly engaged?",
 options:[W("None: the email was private and never reached the market","s 199 covers disseminating information to others, not only public announcements."),
  W("Only a failure to disclose (s 203 SFA), because nothing was announced","The main issue is the false statement, not silence."),
  R("Disseminating false information likely to induce dealing (s 199 SFA)","He knows the figure is false and it is likely to induce purchases. That is the core of s 199."),
  W("Only officers' liability for the company's offence (s 331 SFA)","The direct issue is the manager's own false statement under s 199.")]},

"governance.u2.l2.q10":{prompt:"In one week ListCo (a) fails to announce a major contract loss that it decided to hide, and (b) issues a press release that knowingly overstates its order book. How should each be characterised?",
 options:[W("(a) a false statement (s 199); (b) a failure to disclose (s 203)","This reverses them: hiding information is silence, overstating is a false statement."),
  R("(a) a failure to disclose (s 203); (b) a false statement (s 199)","Hiding required information is a s 203 failure to disclose; a knowingly false press release is a s 199 false statement."),
  W("Both are only officers' liability for the company's offences (s 331)","s 331 is about officers' personal liability for the company's offences, not the offences themselves."),
  W("Both are breaches of the board's management power (s 157A CA)","s 157A concerns who manages the company.")]},

"governance.u6.l4.q17":{prompt:"ListCo has a nominating committee and a remuneration committee, but neither has written terms of reference; they ‘just meet when needed’. Which requirement does this breach?",
 options:[W("s 201B CA, on audit committees, which governs every board committee","s 201B concerns the audit committee, not the NC and RC."),
  W("Provision 9.1 of the Code, on board risk committees","Provision 9.1 concerns board risk committees."),
  W("None: committee procedure is entirely up to the board","Listing Rule 210(5)(e) imposes specific requirements on these committees."),
  R("Listing Rule 210(5)(e): committees doing AC, NC and RC work need written terms of reference","They must have written terms of reference setting out their authority and duties.")]},

"ip.u6.l2.q03":{prompt:"A photographer's image is copied onto 40 websites. Proving her actual loss for each one would be hard. What can she claim under the Copyright Act 2021?",
 options:[R("Statutory damages under s 308, which she can elect instead of proving actual loss","s 305(1) lists the remedies; statutory damages under s 308 are available if the claimant elects."),
  W("Only an injunction, because money remedies need proof of actual loss","Statutory damages exist so that a claimant need not prove actual loss."),
  W("Nothing: copying images onto websites is fair use (s 191)","s 191 lists the fair use factors; nothing in the facts suggests fair use."),
  W("Damages only, limited to a licence fee for each website","She can elect statutory damages under s 308 rather than proving loss.")]},

"ip.u6.l2.q04":{prompt:"A patentee's own lost sales were small, but the infringer made large profits from the infringing product. What can she seek under the Patents Act?",
 options:[R("An account of the infringer's profits (s 67(1)(d)), as an alternative to damages","s 67(1)(d) provides for an account of profits, as applied in Bosch Corp v Wiedson International."),
  W("Damages and a full account of profits for the same infringement","Under s 67(2), damages and an account cannot both be awarded for the same infringement."),
  W("Only damages for her own lost sales; profits are never recoverable","s 67(1)(d) lets her claim the infringer's profits instead."),
  W("Revocation of the infringer's rights under s 80(1)","s 80(1) lists grounds for revoking a patent; it is not an infringement remedy.")]},

"ma.u5.l1.q08":{prompt:"Match each target to the compulsory acquisition regime that applies.",
 pairs:[P("A bidder for a Singapore-incorporated company wants to squeeze out holdouts","Companies Act s 215"),
  P("A bidder for a REIT wants to squeeze out holdout unitholders","SFA s 295A"),
  P("A bidder for a business trust wants to squeeze out holdout unitholders","Business Trusts Act s 40A")]},

"ma.u5.l1.q13":{prompt:"A tycoon announces a take-over offer knowing he has no financing and no reasonable grounds to believe he can pay if it is accepted. What is his exposure?",
 options:[R("An offence: announcing an offer without reasonable grounds to believe he can perform it (s 140 SFA)","s 140 SFA targets announcing an offer without the means to perform it."),
  W("None until shareholders accept; the risk is theirs","The offence lies in the announcement itself."),
  W("A partial-offer breach under Rule 16 of the Code","Rule 16 deals with partial offers; nothing here is partial."),
  W("The compulsory acquisition rules in s 215 CA","s 215 CA is about squeezing out minorities after a successful offer.")]},

"competition.u1.l1.q04":{prompt:"Match each piece of conduct to the Competition Act prohibition it engages.",
 pairs:[P("Two rival suppliers agree to fix their prices","Anti-competitive agreements (s 34)"),
  P("A dominant supplier cuts off a small rival to drive it out","Abuse of a dominant position (s 47)"),
  P("The two market leaders combine their businesses","Mergers that substantially lessen competition (s 54)")]},

"tax.u1.l1.q01":{prompt:"A Singapore company earns trading profits in Singapore. Which statement correctly describes how the Income Tax Act deals with them?",
 options:[R("s 10(1) charges the income; s 14(1) allows expenses incurred in producing it; s 15(1) prohibits certain deductions","s 10(1) is the charging provision, s 14(1) the general deduction formula and s 15(1) the prohibition on deductions."),
  W("s 14(1) charges the income and s 10(1) allows deductions","This reverses them: s 10(1) charges, s 14(1) deducts."),
  W("The profits are charged under s 8(1) GSTA","s 8(1) GSTA charges GST on supplies, not income tax on profits."),
  W("s 15(1) charges the income and s 14(1) prohibits deductions","s 15(1) prohibits deductions; it does not charge tax.")]},

"tax.u1.l1.q07":{prompt:"Match each receipt to its head of charge under s 10(1) ITA.",
 pairs:[P("A consultant's fees from her own practice","Trade, business, profession or vocation (s 10(1)(a))"),
  P("An employee's salary plus free housing","Employment gains, including perquisites (s 10(1)(b))"),
  P("Interest on a loan the company has made","Dividends, interest or discounts (s 10(1)(d))"),
  P("An income receipt that fits none of the specific heads","Other gains or profits of an income nature (s 10(1)(g))")]},

"tax.u1.l4.q07":{pairs:[P("Profit from selling inventory","Trade or business gains (s 10(1)(a))"),
  P("Director's fee paid to an individual","Employment gains (s 10(1)(b))"),
  P("Interest on a fixed deposit","Dividends, interest or discounts (s 10(1)(d))"),
  P("Rent from leasing out a surplus office floor","Rents, royalties, premiums and other profits from property (s 10(1)(f))")]},

"tax.u4.l2.q01":{prompt:"A trading company pays $2m to acquire a patent for use in its business. Singapore has no capital gains tax. How does it get tax relief on the $2m?",
 options:[W("An immediate deduction as a repair (s 14(1)(c))","s 14(1)(c) is repairs; buying a patent is capital expenditure."),
  R("Writing-down allowances for capital expenditure on acquiring IP rights (s 19B ITA)","s 19B gives writing-down allowances to a company that acquires IP rights for use in its trade or business."),
  W("Capital allowances on plant and machinery (s 19 / s 19A)","s 19 and s 19A cover plant and machinery, not IP rights."),
  W("None: capital expenditure is never relieved","s 19B specifically relieves IP acquisition costs.")]},

"tax.u5.l1.q04":{prompt:"Two Singapore companies amalgamate under the Companies Act. They want the assets to pass at book value and the survivor to step into the dissolved company's tax position. What do they need?",
 options:[R("A valid election for tax-neutral treatment under s 34C ITA","With the election, assets and liabilities pass at net book value and the survivor steps into the amalgamating company's position."),
  W("Nothing more: an amalgamation under s 215D CA is automatically tax neutral","s 215D is the company law route; tax neutrality needs the s 34C election."),
  W("A s 13W ITA election on gains from disposing of shares","s 13W concerns gains on share disposals, not amalgamations."),
  W("A carry-over application under s 23 alone","s 23 concerns carry-over of allowances; it does not make the amalgamation tax neutral.")]},

"tax.u5.l2.q01":{prompt:"A company borrows to buy income-producing plant and pays interest on the loan. Which deduction rule applies to the interest?",
 options:[R("The specific interest limb, s 14(1)(a): interest on money borrowed for capital employed in producing income","s 14(1)(a) governs interest deductions."),
  W("Only the general s 14(1) formula","The specific limb for interest is s 14(1)(a)."),
  W("None: s 15(1) prohibits interest deductions","s 15(1) prohibits certain deductions, but does not bar interest on money used to produce income."),
  W("The source rule for withholding in s 12(6)","s 12(6) concerns the source of interest for withholding tax, not deductibility.")]},

"admiralty.u1.l1.q05":{prompt:"Match each claim to its s 3(1) HCAJA category.",
 pairs:[P("A buyer and seller dispute who owns MV ORCHID","Possession or ownership of a ship (s 3(1)(a))"),
  P("The bank's loan secured on the ship is in default","Mortgage of or charge on a ship (s 3(1)(c))"),
  P("MV ORCHID crashes into a pier","Damage done by a ship (s 3(1)(d))"),
  P("The crew have not been paid for three months","Master or crew wages (s 3(1)(n))")]},

"admiralty.u1.l1.q08":{prompt:"Match these further claims to their s 3(1) HCAJA categories.",
 pairs:[P("A ship is damaged when a quay crane collapses onto her","Damage received by a ship (s 3(1)(e))"),
  P("A crew member is hurt by a defective winch","Personal injury from a defect in the ship (s 3(1)(f))"),
  P("Cargo was jettisoned to save the ship","General average act (s 3(1)(p))"),
  P("The master borrowed on the ship's security to finish the voyage","Bottomry (s 3(1)(q))")]},

"admiralty.u1.l1.q12":{prompt:"A shipyard builds a new vessel and is not paid. A dry dock's dock dues also remain unpaid. Which s 3(1) HCAJA category covers both claims?",
 options:[W("Necessaries: goods or materials supplied for the ship's operation (s 3(1)(l))","Building a ship and dock dues are not supplies for her operation."),
  W("Disbursements made on account of a ship (s 3(1)(o))","Neither claimant paid money out on the ship's account."),
  W("Possession or ownership of a ship (s 3(1)(a))","Neither claim is about who owns the ship."),
  R("Construction, repair or equipment of a ship, and dock charges or dues (s 3(1)(m))","Both the shipbuilding claim and the dock dues fall within s 3(1)(m).")]},

"admiralty.u1.l1.q13":{options:[R("Damage received (s 3(1)(e)); in rem via s 4(4), applying the Bunga Melati 5 test","Damage received is within ss 3(1)(d)–(q), so in rem jurisdiction is invoked under s 4(4)."),
  W("Damage done (s 3(1)(d)); in rem directly via s 4(2)","s 3(1)(d) is damage done by a ship, and s 4(2) does not apply."),
  W("Damage received (s 3(1)(e)); in rem directly via s 4(2), with no test","s 4(2) is limited to (a), (b), (c) and (r)."),
  W("Personal injury (s 3(1)(f)); via the maritime-lien route in s 4(3)","s 3(1)(f) is personal injury.")]},

"admiralty.u1.l2.q05":{prompt:"Which claims can be brought in rem against the ship directly under s 4(2) HCAJA, without the s 4(4) Bunga Melati 5 test?",
 options:[W("Every maritime claim in s 3(1)","Only four limbs fall within s 4(2)."),
  W("Cargo and carriage claims (s 3(1)(g) and (h)) only","Cargo claims need s 4(4)."),
  R("Ownership or possession, co-owner disputes, mortgages or charges, and forfeiture or condemnation (s 3(1)(a)–(c) and (r))","s 4(2) covers (a), (b), (c) and (r)."),
  W("Collision, necessaries, repair and wages claims (s 3(1)(d)–(q))","Those limbs need s 4(4).")]},

"admiralty.u1.l3.q01":{options:[W("Carriage or hire agreement (s 3(1)(h)); in rem directly via s 4(2)","This is a supply, not a carriage agreement, and s 4(2) does not cover s 3(1)(h)."),
  R("Necessaries supplied for the ship's operation (s 3(1)(l)); in rem via s 4(4)","Bunkers are necessaries. s 3(1)(l) is within ss 3(1)(d)–(q), so s 4(4) and the Bunga Melati 5 test apply."),
  W("Construction or repair (s 3(1)(m)); in rem directly via s 4(2)","Fuel is not repair, and s 4(2) does not apply."),
  W("Disbursements (s 3(1)(o)); via a maritime lien under s 4(3)","The supplier did not pay money out on the ship's account, and there is no maritime lien.")]},

"admiralty.u1.l3.q03":{options:[R("Mortgage or charge on a ship (s 3(1)(c)); in rem directly via s 4(2)","s 4(2) lets claims under (a), (b), (c) and (r) be brought against the ship directly."),
  W("Mortgage (s 3(1)(c)), but only via s 4(4) and the Bunga Melati 5 test","s 4(4) is not needed for s 3(1)(c)."),
  W("Construction or repair (s 3(1)(m)); via s 4(4)","A mortgage default is not a repair claim."),
  W("Ownership or possession (s 3(1)(a)); via s 4(3)","The bank claims under its mortgage, not as owner.")]},

"admiralty.u1.l3.q04":{options:[W("Disbursements (s 3(1)(o)); via s 4(3)","s 3(1)(o) concerns disbursements made on the ship's account."),
  R("Co-owner dispute over possession, employment or earnings (s 3(1)(b)); directly via s 4(2)","Co-owner disputes are s 3(1)(b), one of the limbs s 4(2) lets you bring against the ship directly."),
  W("Ownership or possession (s 3(1)(a)); via s 4(4)","This is a dispute between co-owners about earnings, and s 4(4) is not needed."),
  W("Carriage or hire agreement (s 3(1)(h)); via s 4(4)","s 3(1)(h) concerns carriage and hire agreements.")]},

"admiralty.u1.l3.q07":{options:[W("Necessaries supplied for the ship's operation (s 3(1)(l))","The agent did not supply goods itself."),
  W("Dock charges and dues (s 3(1)(m))","The agent is not the dock operator."),
  W("Master or crew wages (s 3(1)(n))","The agent is not crew."),
  R("Disbursements by a master, shipper, charterer or agent on account of the ship (s 3(1)(o))","An agent's reimbursement claim is s 3(1)(o).")]},

"admiralty.u1.l3.q13":{prompt:"Cargo was jettisoned in a storm to save the ship. The cargo owner claims a contribution from the other interests. Which s 3(1) HCAJA category does the claim fall under?",
 options:[R("A general average act: a deliberate sacrifice to save the common adventure (s 3(1)(p))","Deliberately jettisoning cargo to save the ship is a general average act."),
  W("Bottomry: a loan on the security of the ship (s 3(1)(q))","No one lent money on the ship's security."),
  W("Salvage (s 3(1)(i))","Salvage rewards a third party who saves property; here cargo was sacrificed."),
  W("Ordinary loss of or damage to cargo (s 3(1)(g))","The loss was a deliberate sacrifice for the common good, which is general average.")]},

"admiralty.u3.l1.q01":{prompt:"A bank's claim under its ship mortgage falls within s 3(1)(c) HCAJA. How does it invoke jurisdiction in rem?",
 options:[R("Directly against the ship under s 4(2), without the Bunga Melati 5 test","Mortgage claims go through s 4(2), which covers (a), (b), (c) and (r)."),
  W("Only through s 4(4), proving the Bunga Melati 5 requirements","s 4(4) is for s 3(1)(d)–(q)."),
  W("It cannot: s 4(1) allows mortgage claims only in personam","s 4(1) is the in personam provision; s 4(2) gives the in rem route."),
  W("Only after first obtaining judgment against the owner in personam","Nothing requires a prior in personam judgment.")]},

"admiralty.u3.l2.q05":{prompt:"A shipowner says the court lacks in rem jurisdiction because the Bunga Melati 5 requirements are not met. How should it challenge this?",
 options:[W("Apply to strike out on the merits under O 9 r 16 ROC","O 9 r 16 is a merits-based strike out, not a jurisdiction challenge."),
  W("File a caveat against arrest","A caveat is not a challenge to jurisdiction."),
  W("Appeal to the MPA","The MPA does not decide jurisdiction."),
  R("Apply under O 9 r 7 ROC and ss 3–4 HCAJA, putting the claimant to proof, with no merits test","Jurisdiction is challenged under O 9 r 7 and ss 3–4.")]},

"admiralty.u4.l3.q10":{prompt:"The court has in rem jurisdiction, but the shipowner says the claim is legally hopeless. How does it get rid of the claim?",
 options:[W("Rely on the bail bond provisions in O 33 r 16 ROC","O 33 r 16 concerns bail bonds."),
  W("Invoke the maritime lien provision, s 4(3) HCAJA","s 4(3) concerns maritime liens."),
  R("Strike it out as legally or factually unsustainable under O 9 r 16 ROC","Strike out is under O 9 r 16 (The Bunga Melati 5; The STX Mumbai)."),
  W("Challenge jurisdiction under O 9 r 7 ROC","O 9 r 7 is for jurisdiction challenges, which have no merits test; here jurisdiction is accepted.")]},

"arb.u1.l2.q02":{prompt:"A Singapore company and an Indonesian company want their arbitration seated in Singapore. Can they simply agree that?",
 options:[R("Yes: parties are free to agree the seat (Art 20(1) Model Law)","If they do not agree, institutional rules may set a default seat or let the tribunal decide."),
  W("No: the tribunal always decides the seat","The tribunal decides only where the parties have not agreed."),
  W("Only with the court's approval under O 48 ROC","O 48 ROC is about arbitration court applications, not choosing the seat."),
  W("No: the seat must be where the contract is performed","No such rule exists; the parties choose freely.")]},

"arb.u1.l3.q01":{prompt:"An Italian and a Malaysian company choose English law to govern the merits of their Singapore-seated arbitration, though neither party is English. Is the choice effective?",
 options:[R("Yes: the tribunal applies the rules of law the parties chose (Art 28(1) Model Law); no connection is needed","Quarella v Scelta Marble: the choice is generally unrestricted."),
  W("No: the chosen law must connect to the parties or the dispute","No connection is required."),
  W("No: the tribunal must apply Singapore law as the lex fori","The lex fori is the court's own law; it does not displace the parties' choice."),
  W("Only if the tribunal accepts it under its competence-competence power (Art 16)","Art 16 is about the tribunal ruling on its own jurisdiction.")]},

"arb.u5.l1.q02":{prompt:"The arbitration clause says each party appoints one arbitrator and those two choose the presiding arbitrator. Is that procedure binding?",
 options:[R("Yes: parties are free to agree the appointment procedure (Art 11(2) Model Law)","The defaults in s 9A IAA and Art 11(3) Model Law apply only failing agreement."),
  W("No: the statutory defaults always apply","The defaults apply only where the parties have not agreed."),
  W("Only with the court's approval under O 48 ROC","O 48 ROC is court procedure; no approval is needed."),
  W("Only once confirmed by the court in setting-aside proceedings (Art 34 / s 24 IAA)","Art 34 Model Law and s 24 IAA concern setting aside awards.")]},

"family.u4.l3.q01":{prompt:"Match each situation to the order the court can add to a protection order under the Women's Charter.",
 pairs:[P("The victim needs the respondent out of their shared flat","Domestic exclusion order (s 60B(2)(a))"),
  P("The respondent waits outside the victim's office every day","Stay away order (s 60B(2)(b))"),
  P("The respondent sends the victim dozens of messages","No contact order (s 60B(2)(c))"),
  P("The court wants the respondent's movements tracked","Electronic monitoring order (s 60C)")]},

"dataprot.u2.l2.q16":{prompt:"Match each employee's conduct to the Part 9B PDPA offence it engages.",
 pairs:[P("Emails the customer list to a friend, knowing he has no authority","Unauthorised disclosure (s 48D)"),
  P("Uses customer data without authority to sell his side business's products","Unauthorised use resulting in gain, harm or loss (s 48E)"),
  P("Matches ‘anonymised’ records back to named people without authority","Unauthorised re-identification (s 48F)"),
  P("The maximum penalty for each offence","Fine up to $5,000, jail up to 2 years, or both")]},

"dataprot.u3.l3.q11":{options:[W("Only making or altering bots for falsehoods (s 8 POFMA)","s 8 concerns making or altering bots; s 7 covers communicating the falsehood."),
  W("No offence: reposting is not communicating","Reposting is an act of communication within s 7(1)."),
  W("Harassment (s 4 POHA)","POHA s 4 does not capture the gravity of election falsehoods, which POFMA targets directly."),
  R("Communicating a known falsehood likely to influence an election, aggravated by fake accounts (s 7(3) POFMA)","A known falsehood likely to influence an election, accelerated by inauthentic accounts, falls within s 7(3).")]},

"comparative.u3.l2.q04":{prompt:"Match each contract problem to the Thai CCC gap-filling rule that resolves it.",
 pairs:[P("A clause could be read as meaningless or as effective","Prefer the reading that gives it some effect (s 10)"),
  P("Genuine doubt about how far the debtor's obligation goes","Interpret in favour of the party incurring the obligation (s 11)"),
  P("The price in words and in figures don't match","The words prevail (s 12)"),
  P("Thai and English versions conflict and intent is unclear","The Thai version prevails (s 14)")]},

"comparative.u4.l2.q10":{prompt:"A sales assistant at a Thai shop carelessly knocks over a heavy display while at work, injuring a customer. The customer wants to sue the shop owner. Which Thai CCC provision does she rely on?",
 options:[R("s 425: the employer is jointly liable for an employee's wrongful act in the course of employment","Under s 426, an employer who pays compensation may recover it from the employee."),
  W("s 420 alone: the general tort clause","s 420 establishes the employee's own liability; s 425 reaches the employer."),
  W("s 437: liability for vehicles and dangerous property","Nothing here involves a vehicle or dangerous property."),
  W("s 448: limitation","s 448 concerns limitation, not who is liable.")]}

});
})();
