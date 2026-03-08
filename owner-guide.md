# EB Services — Your Business Toolkit

Hey! Here's everything I set up for you. All free, all work from your phone, no accounts needed.

---

## Your Website

**https://bryanralston.github.io/eb-services-site/**

This is your professional site — share it with clients, put it on your business cards, link it from your Google Business Profile.

You can update all your business info, testimonials, and photos yourself using the **Site Manager** (see below).

---

## Your Business Tools

These are private — only you can see them. Bookmark each one or **"Add to Home Screen"** on your phone so they work like apps.

### Site Manager
**https://bryanralston.github.io/eb-services-site/site-manager.html**

This is how you update your website — your business info, testimonials, and photos. No coding needed.

- **Business tab**: Your name, phone, email, service area, license number, hours, social media links, bio
- **Reviews tab**: Add/edit/remove customer testimonials that show on the website
- **Gallery tab**: Add photos to your gallery (upload photos to GitHub, then add the filename here)
- **Preview tab**: See how your changes will look before publishing

**How to update your site:**
1. Open Site Manager and make your changes
2. Tap **"Save Config"** — this downloads a small file to your phone
3. Go to your GitHub repository (see "Upload Guide" button for step-by-step)
4. Upload the file — your site updates automatically in 1-2 minutes

**Adding photos:**
1. Take good photos of your work (landscape mode, good lighting)
2. Go to your GitHub repository → click the `photos` folder
3. Click "Add file" → "Upload files" → drag your photos in → click "Commit changes"
4. Open Site Manager → Gallery tab → enter the filename (e.g., `photos/bathroom-remodel-1.jpg`)
5. Save and upload the config file

### Estimate Builder
**https://bryanralston.github.io/eb-services-site/estimate.html**

Create professional estimates on-site. Fill in the client info, add your line items with prices, and send it right from your phone. No more "I'll get that estimate to you later."

- Auto-generates estimate numbers
- Add line items (labor, materials, etc.) with quantity and price
- Tax toggle if needed
- Preview generates a clean, professional document
- Share via text or email directly
- All estimates saved on your phone — tap "Saved" to pull up old ones
- Back up your data: Saved tab → Download Backup

### Invoice Tool
**https://bryanralston.github.io/eb-services-site/invoice.html**

Turn estimates into invoices when the job is done. Track payments and see what's still owed.

- "Create from Estimate" pulls in all the details — no retyping
- Track partial payments (cash, check, card, Zelle, Venmo)
- Shows balance due
- Status tracking: Draft → Sent → Partial → Paid
- Preview and share just like estimates

### Job Tracker
**https://bryanralston.github.io/eb-services-site/jobs.html**

Keep track of all your jobs in one place.

- Pipeline view: Lead → Quoted → Scheduled → In Progress → Completed
- Dashboard shows active jobs, this week's schedule, total pipeline value
- Tap the + button to add a new job
- Link jobs to estimates and invoices
- Quick-tap to change status as jobs progress

### Review Manager
**https://bryanralston.github.io/eb-services-site/reviews.html**

Google reviews are the #1 way to get found locally. This makes asking for them easy.

- **First**: Go to Settings and paste your Google review link (see the setup guide below for how to get it)
- After finishing a job, open this tool → tap the client → hit "Send via Text"
- Pre-written message asks for a review — professional and not pushy
- Tracks who you've sent requests to and your conversion rate

---

## Google Business Profile

**This is the most important thing you can do right now.** When someone searches "handyman near me" or "bathroom remodel [your city]", Google Business Profile is what shows up. It's free.

Setup guide: **https://bryanralston.github.io/eb-services-site/google-business-profile-setup**

Takes about 30 minutes. The guide walks you through everything step by step.

---

## The Workflow

Here's how it all fits together:

1. **Client calls** → Add them as a Lead in **Job Tracker**
2. **Visit the site** → Create an estimate in **Estimate Builder**, send it on the spot
3. **They say yes** → Update status to Scheduled in **Job Tracker**
4. **Do the work** → Update to In Progress, then Completed
5. **Get paid** → Create an invoice from the estimate in **Invoice Tool**, track payments
6. **After the job** → Send a review request from **Review Manager**
7. **Repeat** → More reviews = more Google visibility = more calls

---

## Tips

- **Add to Home Screen**: On iPhone, open each link in Safari → tap the Share button (square with arrow) → "Add to Home Screen." Now it's an app icon.
- **Back up your data**: Each tool has a "Download Backup" button in the Saved tab. Do this every week or two — it saves a file you can restore if anything happens.
- **One device**: Your data saves on whatever phone/browser you use. Pick one and stick with it. If you need to switch devices, use Download Backup → Restore Backup on the new one.

---

## Getting Your Own Domain Name

Right now the site lives at `bryanralston.github.io/eb-services-site` — that works, but for a real business you want your own domain like **www.ebservicesllc.com** or whatever matches your business name.

### Step 1: Buy a domain (~$12/year)

1. Go to **[Namecheap.com](https://www.namecheap.com)** (or Google Domains, GoDaddy, etc. — Namecheap is cheapest and simplest)
2. Search for the domain you want (e.g., `ebservicesllc.com`, `ebservicestx.com`, etc.)
3. Pick one that's available — `.com` is best, but `.net` or `.co` work too
4. Add to cart and check out. Should be around **$10-15/year**
5. **Don't buy any add-ons** they try to sell you (domain privacy is usually free on Namecheap, skip everything else)

### Step 2: Point it at your site

This is where you choose — keep it on Bryan's GitHub (easy), or set up your own (more independent).

**Option A: Keep it on Bryan's GitHub (easiest)**

Bryan just needs to:
1. Go to the repo settings on GitHub
2. Add your domain under "Custom domain"
3. You set up DNS on Namecheap to point at GitHub

That's it. Your customers see `www.yourdomain.com`, the hosting stays free, and Bryan can still update the site for you.

**Option B: Set up your own GitHub account (fully independent)**

If you want to own and control everything yourself:

1. **Create a GitHub account**
   - Go to **[github.com](https://github.com)** and sign up (free)
   - Use your business email if you have one

2. **Bryan transfers the site to you**
   - Bryan will transfer the repository to your GitHub account
   - You accept the transfer — now you own all the code

3. **Turn on GitHub Pages**
   - Go to your repository → **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Branch: **master**, folder: **/ (root)**
   - Click Save
   - Your site will be live at `yourusername.github.io/eb-services-site` within a few minutes

4. **Connect your custom domain**
   - Still in Settings → Pages, type your domain (e.g., `www.ebservicesllc.com`) in the "Custom domain" box and click Save
   - GitHub will give you a message about DNS configuration

5. **Set up DNS on Namecheap**
   - Log in to Namecheap → **Domain List** → click **Manage** next to your domain
   - Go to the **Advanced DNS** tab
   - Delete any existing records, then add these:

   | Type | Host | Value |
   |------|------|-------|
   | A Record | @ | 185.199.108.153 |
   | A Record | @ | 185.199.109.153 |
   | A Record | @ | 185.199.110.153 |
   | A Record | @ | 185.199.111.153 |
   | CNAME | www | yourusername.github.io. |

   - Replace `yourusername` with your actual GitHub username
   - Save all changes

6. **Wait for DNS (up to 24-48 hours, usually faster)**
   - Check back in an hour or two — most of the time it's working within 30 minutes
   - Once it's live, go back to GitHub Pages settings and check **"Enforce HTTPS"**

7. **You're done.** Your site is live at your own domain, hosted free on your own GitHub account. You fully own and control it.

### Which option should I pick?

- **Option A** if you just want a domain name and don't care about managing the tech. Bryan handles updates.
- **Option B** if you want full ownership and independence. It's a one-time 30 minute setup and then you're self-sufficient. You can always ask Bryan to help update the site — you'd just give him access to your repo.

Either way, the only cost is the domain name (~$12/year). Hosting is free forever.

---

Questions? Just text me.
