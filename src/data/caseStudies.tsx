import React from "react";
import { Link } from "react-router-dom";

export interface CaseStudy {
    slug: string;
    name: string;
    summary: string;
    content: React.ReactNode;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "manobsheba",
        name: "Manob Sheba: Taking a Doctor to the Pharmacy",
        summary: "Co-founder, CTO, and founding engineer on a rural telemedicine platform for Bangladesh — built from a research memo to production in one summer.",
        content: (
            <>
                <p>
                    <em>
                        Co-founder, CTO & founding engineer. June–September 2026. Live at{" "}
                        <a href="https://manobshebabd.com" target="_blank" rel="noreferrer">manobshebabd.com</a>.
                    </em>
                </p>

                <hr />

                <h2>Overview</h2>
                <p>
                    Bangladesh has about <strong>3 physicians per 10,000 people</strong> — and{" "}
                    <strong>35% of the country's doctors serve the 15% of the population living in four cities.</strong>{" "}
                    The people who need care most are the least able to travel to it. Manob Sheba routes them
                    through the one piece of health infrastructure their village already has:{" "}
                    <strong>the pharmacy.</strong>
                </p>
                <p>
                    A patient walks into a pharmacy. The pharmacist — we call them an{" "}
                    <strong>HCAP agent</strong> — registers them, books a slot with a verified BMDC doctor, and
                    then <strong>sits with them for the consultation</strong>, translating, chaperoning, and
                    handing over medicine at the end. The doctor logs in from Dhaka, diagnoses over audio, and
                    writes a digital prescription. The patient never leaves their village.
                </p>
                <p>
                    I was the co-founder, CTO, and founding engineer. I built the whole thing — schema, API, frontend, design system,
                    CI/CD, compliance architecture — while my two co-founders built the clinical network and the
                    pharmacy relationships. Four months, from a research document to a live product with real
                    users.
                </p>
                <p>
                    <strong>The hook, though, is not the launch. It is this:</strong> during pre-pilot security
                    verification I ran 8 escalation and isolation checks against production, and discovered that{" "}
                    <strong>every real user registration in the product's history had been silently failing.</strong>{" "}
                    Not degraded — failing. Nobody had noticed because every account in the system had been
                    created by hand during development. That is the moment I would put on a slide.
                </p>

                <table>
                    <tbody>
                        <tr>
                            <td><strong>Role</strong></td>
                            <td>Co-founder, CTO & founding engineer — sole technical builder</td>
                        </tr>
                        <tr>
                            <td><strong>Team</strong></td>
                            <td>2 business-side co-founders</td>
                        </tr>
                        <tr>
                            <td><strong>Timeline</strong></td>
                            <td>June → September 2026</td>
                        </tr>
                        <tr>
                            <td><strong>Surfaces</strong></td>
                            <td>4 role-based apps (patient, HCAP, doctor, admin)</td>
                        </tr>
                        <tr>
                            <td><strong>Routes</strong></td>
                            <td>71</td>
                        </tr>
                        <tr>
                            <td><strong>Tests</strong></td>
                            <td>276 (138 frontend / 138 backend)</td>
                        </tr>
                        <tr>
                            <td><strong>Prisma models</strong></td>
                            <td>23 (+9 enums), 7 migrations</td>
                        </tr>
                        <tr>
                            <td><strong>Status</strong></td>
                            <td>Live in production</td>
                        </tr>
                    </tbody>
                </table>

                <hr />

                <h2>Challenge</h2>

                <h3>The problem is distance, and distance is a design problem</h3>
                <p>The clinical need was not subtle. The same evidence that shaped the product:</p>
                <ul>
                    <li>
                        <strong>~26% rural smartphone ownership.</strong> Three quarters of the target users do
                        not have the device most telemedicine products assume they have.
                    </li>
                    <li>
                        <strong>~15% rural digital literacy.</strong> Only a fraction of users can complete a
                        complex multi-step transaction unaided.
                    </li>
                    <li>
                        <strong>~70% already use informal drug sellers as their first point of contact</strong>{" "}
                        when someone in the family gets sick.
                    </li>
                    <li>
                        <strong>Bottom-decile 4G runs 2.22–5.69 Mbps</strong> in the target districts, and{" "}
                        <strong>43.6% of users cite data cost</strong> as a barrier.
                    </li>
                </ul>
                <p>
                    Read those four numbers together and they rule out the obvious product. You cannot ship an
                    app-only, video-first, self-service telemedicine product to this market. The device is
                    wrong, the literacy is wrong, the bandwidth is wrong, and the cost model is wrong.
                </p>
                <p>
                    But the third number is not a problem — it is the answer.{" "}
                    <strong>People already go to the pharmacy first.</strong> So do not fight that behaviour.
                    Instrument it.
                </p>

                <h3>The central design bet</h3>
                <blockquote>
                    <p>
                        <strong>The HCAP agent is not a workaround for low digital literacy. The HCAP agent is the
                        product.</strong>
                    </p>
                </blockquote>
                <p>
                    Every decision downstream follows from that. The pharmacist is the trusted human in the
                    room, so they hold the session: they register the patient, they book the slot, they consent
                    on the patient's behalf with the patient physically present, and they hand over the medicine.
                    The doctor gets a <strong>prepped, accompanied patient</strong> instead of a cold call with a
                    stranger who cannot describe their own symptoms.
                </p>
                <p>
                    That reframing is what made the whole thing buildable. It also created three hard
                    constraints:
                </p>
                <ol>
                    <li>
                        <strong>Audio only.</strong> Bandwidth and data cost made video indefensible for Phase 1.
                        Fallback chain: video → audio → text → book for later.
                    </li>
                    <li>
                        <strong>Compliance is not a feature, it is a gate.</strong> A BMDC consent record must
                        exist <em>before</em> any audio starts. Non-negotiable, legally.
                    </li>
                    <li>
                        <strong>The interface has to work for a first-time smartphone user</strong> — while
                        staying efficient enough that a pharmacist serving a queue does not resent it.
                    </li>
                </ol>

                <h3>Why the obvious tools were unavailable</h3>
                <p>I evaluated the off-the-shelf options and they all failed on a specific, checkable reason:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Why it failed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Google Meet embedded</td>
                            <td>
                                <code>X-Frame-Options</code> + CSP block embedding; programmatic HIPAA BAA
                                requires paid Workspace Enterprise
                            </td>
                        </tr>
                        <tr>
                            <td>Video-first RTC</td>
                            <td>Bandwidth floor above the target market's 2.22 Mbps bottom decile</td>
                        </tr>
                        <tr>
                            <td>App-only install</td>
                            <td>26% smartphone ownership kills the addressable market</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    I also fielded a "let's move to LiveKit, they give 5,000 free minutes" suggestion from a
                    teammate. That one was <strong>backwards</strong> — Agora's free tier is 10,000 min/month
                    against LiveKit Cloud's 5,000. Wrote it down, kept Agora. Cost modelling put 100% audio at
                    roughly <strong>$277/year</strong> versus ~$1,112/year at a 60/40 video/audio split.
                </p>

                <hr />

                <h2>Process</h2>

                <h3>Phase 1 — Research before code (Jun 1–2)</h3>
                <p>
                    I started by refusing to write a line of code. The sequence was: deep research → PRD →
                    technical design → agent instruction files → build. Two precedents did most of the shaping:
                </p>
                <ul>
                    <li>
                        <strong>Jeeon (Bangladesh):</strong> 42 pharmacies, ~10K teleconsults, 7,049 unique
                        patients — and the model proved so effective it converted to a non-profit. Evidence the
                        pharmacy-anchored model works here.
                    </li>
                    <li>
                        <strong>Sehat Kahani (Pakistan):</strong> 1.1M+ consultations. The closest analogue at
                        scale.
                    </li>
                </ul>
                <p>
                    Both validated the intermediary model. Neither is a consumer app. That settled the
                    architecture.
                </p>

                <h3>Phase 2 — Build in vertical slices (Jun 4 → Sep)</h3>
                <p>
                    I built and shipped in nine increments, each ending with lint + typecheck + tests green:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>What shipped</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1–3</td>
                            <td>Auth (sign in/up/out, role routing, guarded routes, password reset) + role-guarded routing</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Doctor availability — doctors write slots, HCAP reads them</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>HCAP dashboard (7 pages) — the critical surface</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Doctor dashboard rewired from mock data to real data</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Agora consultation rooms + BMDC consent gate</td>
                        </tr>
                        <tr>
                            <td>8–9</td>
                            <td>Prescription share links, patient account area</td>
                        </tr>
                    </tbody>
                </table>
                <blockquote>
                    <p>
                        <strong>Visual:</strong> <code>web-frontend/src/assets/hcap agent example.jpg</code> — the
                        HCAP workflow in situ.
                    </p>
                </blockquote>

                <h3>The decision I would defend hardest: killing the mocked prototype</h3>
                <p>
                    The frontend started life as a Lovable-generated prototype with convincing mock data
                    everywhere. The instinct is to keep it and "wire it up later." I deleted the mocks surface
                    by surface instead, and insisted that <strong>nothing upstream of the UI be fabricated.</strong>
                </p>
                <p>
                    When I benchmarked the patient dashboard against DocTime and Shukhee, they showed fields we
                    had nowhere to store — so the options were to fake the display values or add real columns. I
                    added the columns. It cost more and it is why the dashboard survives contact with real data.
                </p>
                <p>
                    Twelve mock modules still exist in <code>src/data/</code>, on surfaces that are genuinely not
                    yet backed (blog posts, invoices, notifications). That is a known, listed gap, not an
                    oversight.
                </p>

                <h3>The competitive teardown</h3>
                <p>
                    I rebuilt the patient account area after a session sizing us against <strong>DocTime</strong>{" "}
                    and <strong>Shukhee</strong>:
                </p>
                <blockquote>
                    <p>
                        <strong>Visual:</strong> <code>ref/Dr-Maisha-Maliha-DocTime-*.jpg</code>,{" "}
                        <code>ref/Shukhee-*.jpg</code>, <code>ref/Dr-Raghib-Manzoor-Praava-Health-*.jpg</code>
                    </p>
                </blockquote>
                <p>
                    Two things I deliberately <strong>cut</strong> rather than copy: family-member profiles (no
                    data model justified it yet) and points/subscription tiles (no monetization system existed to
                    back them). I also swapped their "Test Reports" for <strong>Sick Leave Certificates</strong>,
                    because Manob Sheba has a sick-leave model and no diagnostics model. Copying a competitor's
                    navigation without owning its data is how you end up with a portfolio of dead links.
                </p>

                <h3>The HCAP onboarding problem</h3>
                <p>
                    Pharmacists are not a self-serve signup cohort — they need verification against DGDA
                    accreditation, and the person filling the form is often not the person who will use the
                    product. So onboarding is <strong>two-stage</strong>: a short request form, then a full
                    registration sent as a tokenised email link (<code>/hcap-onboarding/:token</code>) to the
                    verified address. It costs an email round-trip and saves a bad first session.
                </p>

                <hr />

                <h2>Solution</h2>

                <h3>What shipped</h3>
                <p>Four role-based surfaces behind one auth boundary:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Surface</th>
                            <th>Who</th>
                            <th>What it does</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Public</td>
                            <td>Anyone</td>
                            <td>Landing, specialty browsing, doctor profiles, booking (auth-gated)</td>
                        </tr>
                        <tr>
                            <td><code>/hcap/*</code></td>
                            <td>Pharmacy agents</td>
                            <td>Register patients, book slots, run the consultation, dispense</td>
                        </tr>
                        <tr>
                            <td><code>/dashboard/*</code></td>
                            <td>Doctors</td>
                            <td>Availability, appointment queue, consultation room, prescriptions, earnings</td>
                        </tr>
                        <tr>
                            <td><code>/admin/*</code></td>
                            <td>Platform staff</td>
                            <td>Verify doctors and pharmacies, audit trail, user management</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    71 routes. 68 page components, 76 purpose-built components on top of 48 vendored shadcn/ui
                    primitives, 36 custom hooks.
                </p>

                <h3>The compliance architecture</h3>
                <p>This is the part I am proudest of, and the part easiest to fake.</p>
                <p>
                    <strong>Consent as a hard gate.</strong> Table <code>consultation_logs</code> carries{" "}
                    <code>consent_given_at</code> and <code>consent_given_by</code>. The consent modal fires and
                    writes <strong>before</strong> <code>client.join()</code> is ever called. There is no code
                    path to audio without a consent record. That is a legal requirement, so it is enforced by
                    control flow, not by a checkbox.
                </p>
                <p>
                    <strong>Audit trail as a database guarantee.</strong> Not application logic — six{" "}
                    <code>AFTER INSERT OR UPDATE OR DELETE</code> triggers (<code>audit_patients</code>,{" "}
                    <code>audit_appointments</code>, <code>audit_prescriptions</code>,{" "}
                    <code>audit_doctor_profiles</code>, <code>audit_hcap_profiles</code>,{" "}
                    <code>audit_user_profiles</code>) feeding <code>audit_logs</code>, with actor identity read
                    from <code>current_setting('request.jwt.claim.sub')</code>. The design point: if the app
                    forgets to log, the database logs anyway.
                </p>
                <p>
                    <strong>And here is where the design outpaced the deployment, which is the honest version.</strong>{" "}
                    When we migrated off Supabase, the audit trigger did not come with us — it had been
                    provisioned out-of-band on the old database and existed in no migration file. So{" "}
                    <code>audit_logs</code> sat <strong>silently empty in production</strong> while the app wrote
                    patient data. Nothing failed, nothing alerted; the table was simply never written to. I wrote
                    the trigger migration to fix it. That migration is <strong>written but not yet applied</strong>{" "}
                    — it is the first item in the pre-pilot queue, and I am not going to describe it as live
                    until it is.
                </p>
                <p>
                    <strong>Row-Level Security, verified rather than assumed.</strong> I wrote{" "}
                    <code>verify-rls.mjs</code> to probe the live policies <strong>using only the anon key</strong>{" "}
                    — never <code>service_role</code> — with explicit <code>expectAllow</code> /{" "}
                    <code>expectDeny</code> assertions. 8/8 isolation and escalation checks pass against
                    production.
                </p>

                <h3>Three bugs worth reading about</h3>
                <p>
                    <strong>1. Every registration was failing. Silently.</strong>
                </p>
                <p>
                    Found while running that RLS verification. With email confirmation enabled, Supabase's{" "}
                    <code>signUp()</code> returns <strong>no session</strong>. Our registration flow then called{" "}
                    <code>.insert()</code> on the profile tables — with <code>auth.uid()</code> null — and RLS
                    correctly rejected every one.{" "}
                    <strong>Production had never successfully registered a real user.</strong>
                </p>
                <p>
                    Fixed with a <code>handle_new_user()</code> trigger on <code>auth.users</code> (
                    <code>SECURITY DEFINER</code>) that creates the profile rows server-side, independent of
                    confirmation state. Role is allow-listed (<code>doctor</code>/<code>hcap</code> only) inside
                    the trigger, because the metadata it reads is client-controlled. I verified the fix by
                    attempting a <code>role:'admin'</code> escalation through signup metadata — it creates zero
                    rows.
                </p>
                <p>
                    The reason nobody caught it: every account in the system to date had been hand-created by me.{" "}
                    <strong>The tests passed because the tests never created a user the way a user would.</strong>
                </p>
                <p>
                    <strong>2. <code>nest build</code> OOM-killed the cPanel deploy.</strong>
                </p>
                <p>
                    The backend host enforces a per-process memory cap. <code>nest build</code> aborted with exit
                    134 — and because it clears <code>dist/</code> first, a failed build left nothing behind.
                    Fix: capped TypeScript compile (
                    <code>node --max-old-space-size=512 …tsc -p tsconfig.build.json</code>), build in CI,{" "}
                    <code>rsync</code> the artifact up, then <code>touch tmp/restart.txt</code>. Passenger keeps
                    serving the old code until that touch, so a broken build degrades to "no new features" rather
                    than an outage.
                </p>
                <p>
                    <strong>3. I broke production with a CI flag.</strong>
                </p>
                <p>
                    The first <code>--prod</code> deploy from GitHub Actions used{" "}
                    <code>vercel build --prebuilt</code>, which in CI writes <code>[SENSITIVE]</code> placeholders
                    for sensitive env vars — and they got baked into the bundle. <code>manobshebabd.com</code>{" "}
                    served <code>API_BASE_URL="[SENSITIVE]"</code> for a few minutes. Fix: drop{" "}
                    <code>--prebuilt</code> and let Vercel build server-side, where the real values exist. The
                    workflow file now carries a comment explaining why, so future-me cannot reintroduce it.
                </p>
                <p>
                    Two more that were pure craft failures: <code>reschedule()</code> never cleared{" "}
                    <code>availabilityId</code>, so a rescheduled appointment kept pointing at its old slot and
                    the Join button vanished permanently once that slot's end time passed (two production rows
                    needed one-off SQL repair). And every timestamp was formatted without a <code>timeZone</code>,
                    so the app showed device-local or UTC times to users in Dhaka.
                </p>

                <h3>The design system</h3>
                <p>
                    Semantic design tokens only, in HSL, with a hard rule enforced in review:{" "}
                    <strong>never hardcode a colour.</strong> Deep green <code>--primary: 152 68% 18%</code> as
                    the trust anchor, teal and amber as support, cream surfaces, <code>--radius: 0.75rem</code>.
                    Typography: <strong>Montserrat</strong> for UI, <strong>Source Serif Pro</strong> for
                    long-form, Roboto Mono for numerals. 48 shadcn/ui primitives vendored and treated as library
                    code — extended via CVA variants, never edited. The one ESLint carve-out in the repo exists
                    precisely so <code>no-empty-object-type</code> and friends are relaxed for vendored primitives
                    only, letting the lint gate stay strict everywhere I actually write code.
                </p>

                <hr />

                <h2>Impact</h2>

                <h3>What is verifiable today</h3>
                <p>
                    I am being deliberate about this split, because portfolio metrics are usually where the lying
                    starts.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Value</th>
                            <th>How you can check it</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Routes</td>
                            <td>71</td>
                            <td><code>{'grep -c "<Route" web-frontend/src/App.tsx'}</code></td>
                        </tr>
                        <tr>
                            <td>Test cases</td>
                            <td>276 (138 + 138) across 37 files</td>
                            <td><code>npm test</code> in each workspace</td>
                        </tr>
                        <tr>
                            <td>Frontend build</td>
                            <td>CI-gated on every PR</td>
                            <td><code>.github/workflows/deploy.yml</code></td>
                        </tr>
                        <tr>
                            <td>Prisma models</td>
                            <td>23 models, 9 enums</td>
                            <td><code>backend/prisma/schema.prisma</code></td>
                        </tr>
                        <tr>
                            <td>Migrations</td>
                            <td>7</td>
                            <td><code>backend/prisma/migrations/</code></td>
                        </tr>
                        <tr>
                            <td>RLS verification</td>
                            <td>8/8 pass against prod</td>
                            <td><code>web-frontend/scripts/verify-rls.mjs</code></td>
                        </tr>
                        <tr>
                            <td>Compliance</td>
                            <td>Consent logging live; audit triggers written, not yet applied</td>
                            <td>see below</td>
                        </tr>
                        <tr>
                            <td>Availability</td>
                            <td>Live since Sept 2026</td>
                            <td>
                                <a href="https://manobshebabd.com" target="_blank" rel="noreferrer">manobshebabd.com</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    Both CI pipelines gate every PR on lint → typecheck → tests. That gate has caught real
                    regressions, which is the only reason it is worth having.
                </p>

                <h3>Pilot targets — goals, not results</h3>
                <p>Stated plainly as targets, because we have not run the pilot yet:</p>
                <ul>
                    <li><strong>10 doctors</strong> onboarded and verified</li>
                    <li><strong>15–20 HCAP agents</strong> across target districts</li>
                    <li><strong>100 consultations</strong> in month one</li>
                </ul>
                <p>I will not report these as achievements. Ask me again after the pilot.</p>

                <h3>What I would call the real outcome</h3>
                <p>
                    A working, compliance-gated, four-role telemedicine platform — built and operated by{" "}
                    <strong>one engineer</strong> — that a pharmacist with no technical training can drive while
                    standing next to a patient. And a security verification pass that found a bug which had been
                    silently breaking 100% of real signups, because I probed production the way an attacker would
                    instead of the way our tests did.
                </p>

                <hr />

                <h2>Reflection</h2>

                <h3>The lesson I keep coming back to</h3>
                <p>
                    <strong>The test suite was green for two months while registration was completely broken.</strong>{" "}
                    Not because the tests were wrong, but because they exercised the system the way <em>I</em> did
                    — through a path I controlled — instead of the way a stranger would. Verification that only
                    confirms your own assumptions is theatre. The RLS script found it because it was written
                    adversarially: assume nothing, assert both that access is <em>allowed</em> and that it is{" "}
                    <em>denied</em>.
                </p>
                <p>I now write the negative assertion first. It has caught more since.</p>

                <h3>What I would do differently</h3>
                <ol>
                    <li>
                        <strong>Compliance belongs in migration #1 — and never outside version control.</strong>{" "}
                        The audit trigger on the original database had been provisioned by hand and lived in no
                        migration file, so when we changed stacks it simply did not come along.{" "}
                        <code>audit_logs</code> was silently empty in production and nothing failed loudly.
                        Anything a regulator would ask for should be a tracked, applied migration from day one.
                    </li>
                    <li>
                        <strong>Test on the actual target device, in the actual target conditions, from day one.</strong>{" "}
                        Our mobile mic-permission bug existed because <code>getUserMedia</code> was called{" "}
                        <em>after</em> the consent POSTs — by which point the browser's user-gesture window had
                        closed, so Chrome on Android refused. The fix was one combined <code>getUserMedia</code>{" "}
                        call as the first async operation in <code>join()</code>. I then re-broke it by splitting
                        that call in two.{" "}
                        <strong>A bug you fix once is a coincidence; a bug you fix twice is a missing test.</strong>
                    </li>
                    <li>
                        <strong>Plan the backend migration earlier.</strong> We started on Supabase and moved to a
                        self-hosted NestJS + Prisma stack mid-project. The right call — but it meant RLS policies
                        ended up applied out-of-band to production and tracked in no migration, so a fresh
                        database has no RLS at all. That is a landmine for whoever provisions environment #2.
                    </li>
                    <li>
                        <strong>Secret hygiene was right at the repo boundary and sloppy at the file boundary.</strong>{" "}
                        Nothing sensitive was ever committed — <code>.env</code> is gitignored, was never added in
                        any commit on any branch, and is excluded from the deploy rsync. But the local{" "}
                        <code>.env</code> files were left at mode <code>755</code> (world-readable, with the
                        executable bit set) and the dev copy duplicates production secrets rather than using
                        dev-scoped ones. The repo-level discipline was correct; the filesystem-level discipline
                        was not.
                    </li>
                </ol>

                <h3>Honest gaps</h3>
                <p>Because a case study that claims zero caveats is not describing a real project:</p>
                <ul>
                    <li>
                        <strong>The Android 3G smoke test has not been run on a physical low-end device.</strong>{" "}
                        This is the last pre-pilot gate and it needs a human holding a phone.
                    </li>
                    <li>
                        <strong>Agora video is verified by unit tests and documentation only</strong> — never by
                        two real participants on two real devices.
                    </li>
                    <li>
                        <strong>SMS is log-only.</strong> <code>SmsService</code> prints OTPs to the server
                        console; no gateway is wired.
                    </li>
                    <li>
                        <strong>The AI prescription prefill is mocked.</strong> Real triage is future work, and it
                        is deliberately framed as "suggestion for doctor review" — never as a diagnosis.
                    </li>
                    <li>
                        <strong><code>rememberMe</code> is inert.</strong> It needs a second auth-client
                        initialisation.
                    </li>
                    <li><strong>12 mock data modules still ship</strong> on not-yet-backed surfaces.</li>
                    <li>
                        <strong>The audit-trigger migration is written but not yet applied.</strong> It is the
                        first item in the pre-pilot queue; until it lands, the audit trail is not live.
                    </li>
                    <li>
                        <strong>Docs drift.</strong> Three repo-root files (<code>CHANGELOG.md</code>,{" "}
                        <code>README.md</code>, <code>REVIEW-CHECKLIST.md</code>) are leftover template
                        boilerplate from an unrelated project and describe a stack we never shipped. The docs
                        reorganisation is genuinely on the list.
                    </li>
                </ul>

                <h3>Where this leaves me</h3>
                <p>
                    I came out of this able to own a regulated product end to end: read the market evidence, turn
                    it into a scope, pick a stack and defend it, model the data, enforce compliance at the
                    database layer, ship through CI, and then{" "}
                    <strong>try to break it on purpose before someone else does.</strong>
                </p>
                <p>
                    The single most valuable hour of the project was the one where I stopped building and
                    attacked my own production database with the anon key. That is the habit I am keeping.
                </p>

                <hr />

                <h2>Appendix — Stack</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Layer</th>
                            <th>Choice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Frontend</td>
                            <td>React 18 + Vite + TypeScript, Tailwind, shadcn/ui, react-hook-form + zod, TanStack Query</td>
                        </tr>
                        <tr>
                            <td>API</td>
                            <td>NestJS 11, Prisma 6, custom JWT auth with refresh-token rotation, <code>@nestjs/throttler</code></td>
                        </tr>
                        <tr>
                            <td>Database</td>
                            <td>PostgreSQL (self-hosted, OCI), RLS live on prod; audit triggers written, pending application</td>
                        </tr>
                        <tr>
                            <td>Realtime</td>
                            <td>Agora RTC — audio-first, low-bandwidth camera profile</td>
                        </tr>
                        <tr>
                            <td>Payments</td>
                            <td>SSLCommerz (cash-first, reconciled by admin)</td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>S3-compatible object storage</td>
                        </tr>
                        <tr>
                            <td>Hosting</td>
                            <td>Vercel (frontend) · cPanel/Passenger (API)</td>
                        </tr>
                        <tr>
                            <td>CI/CD</td>
                            <td>GitHub Actions — lint → typecheck → test → deploy, per workspace</td>
                        </tr>
                    </tbody>
                </table>

                <hr />

                <p>
                    <em>
                        Built in Bangladesh. If you are hiring for platform, full-stack, or healthcare-adjacent
                        engineering, <Link to="/" state={{ scrollTo: "contact" }}>get in touch</Link>.
                    </em>
                </p>
            </>
        ),
    },
    {
        slug: "telecom-event-platform",
        name: "Telecom Event Management Platform",
        summary: "Sole full-stack engineer on Metal Plus' event-management platform for Grameenphone.",
        content: (
            <>
                <p>
                    Sole full-stack engineer on Metal Plus' event-management platform for
                    Grameenphone — a Go REST API, PostgreSQL, a Flutter field client, and a
                    Next.js admin dashboard, shipped to production on AWS.
                </p>
                <p>Full write-up coming soon.</p>
            </>
        ),
    },
    {
        slug: "gp-sync",
        name: "Grameenphone delivery",
        summary: "Rescued and stabilised the legacy GP Sync codebase for Grameenphone's equipment-inventory system.",
        content: (
            <>
                <p>
                    Inherited the legacy GP Sync codebase for Grameenphone's
                    equipment-inventory system after it had fallen into disrepair.
                </p>
                <ul>
                    <li>Rescued and stabilised a legacy codebase with no prior documentation or handover.</li>
                    <li>Fixed several critical bugs that were blocking reliable deployment.</li>
                    <li>Stabilised the deployment pipeline, then took over the in-progress equipment-inventory system.</li>
                </ul>
            </>
        ),
    },
];
