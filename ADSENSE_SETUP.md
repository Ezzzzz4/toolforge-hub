# Google AdSense Integration Guide

## Step 1: Get Your AdSense Client ID

1. Go to https://www.google.com/adsense/
2. Sign in with your approved AdSense account
3. Navigate to **Ads** → **Overview**
4. Look for your publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

## Step 2: Create Ad Units

For best results, create these ad units in AdSense:

### Homepage Ads
1. **Top Banner** - Display ad (Responsive or 728x90 Leaderboard)
2. **Bottom Banner** - Display ad (Responsive or 728x90 Leaderboard)

### Tool Page Ads  
3. **Sidebar Rectangle** - Display ad (300x250 Medium Rectangle)

### Tools Listing Page
4. **Tools Top Banner** - Display ad (Responsive)
5. **Tools Bottom Banner** - Display ad (Responsive)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Add your AdSense details:

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456

# Ad Slot IDs from AdSense dashboard
NEXT_PUBLIC_AD_SLOT_HOME_TOP=1234567890
NEXT_PUBLIC_AD_SLOT_HOME_BOTTOM=2345678901
NEXT_PUBLIC_AD_SLOT_TOOL_SIDEBAR=3456789012
NEXT_PUBLIC_AD_SLOT_TOOLS_TOP=4567890123
NEXT_PUBLIC_AD_SLOT_TOOLS_BOTTOM=5678901234
```

## Step 4: Update Ad Components

The AdBanner components need ad slot IDs. Update these files:

### Homepage (`src/app/page.tsx`)
```tsx
<AdBanner type="horizontal" slot={process.env.NEXT_PUBLIC_AD_SLOT_HOME_TOP} />
// ... content ...
<AdBanner type="horizontal" slot={process.env.NEXT_PUBLIC_AD_SLOT_HOME_BOTTOM} />
```

### Tool Pages (`src/components/ToolLayout.tsx`)
```tsx
<AdBanner type="rectangle" slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL_SIDEBAR} />
```

### Tools Listing (`src/app/tools/page.tsx`)
```tsx
<AdBanner type="horizontal" slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOLS_TOP} />
// ... content ...
<AdBanner type="horizontal" slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOLS_BOTTOM} />
```

## Step 5: Deploy

### Local Testing
```bash
npm run dev
```

Ads won't show in development, but you can verify the code is there.

### Production Deployment (Vercel)
1. Push code to GitHub
2. In Vercel dashboard, go to **Settings** → **Environment Variables**
3. Add all `NEXT_PUBLIC_*` variables
4. Redeploy

## Step 6: Verify in AdSense

After deployment:
1. Visit your live site
2. In AdSense, check **Sites** to ensure your domain is approved
3. Ads may take 24-48 hours to start showing
4. Check **Reports** to see impressions and earnings

## Important Notes

- **Ads won't show immediately** - AdSense needs to crawl and approve your content
- **Don't click your own ads** - This can get your account banned
- **Natural placement** - Don't make ads too intrusive
- **Mobile friendly** - Responsive ads work best across devices

## Troubleshooting

### Ads not showing?
1. Check browser console for errors
2. Verify env variables are set in Vercel
3. Ensure AdSense account is fully approved
4. Wait 24-48 hours after first deployment
5. Check that your domain is added in AdSense

### "Ad slot not found" errors?
- Double-check ad slot IDs match AdSense dashboard
- Ensure you created the ad units before deploying

### Policy violations?
- Review AdSense policies
- Ensure Privacy Policy page is accessible
- Add "Advertisement" label near ads (already included)
