# Admin Panel Guide

## How to Access

1. **Via URL Hash**: Navigate to `https://thephygital.studio#admin`
2. **Direct URL**: Navigate to `https://thephygital.studio/admin` (if routing is configured)

## Default Password

The default password is: `phygital2025`

**⚠️ IMPORTANT**: Change this password in `src/components/Admin.tsx` by updating the `ADMIN_PASSWORD` constant.

## Features

### 1. **Manage YouTube Videos**
- **Reorder**: Use ↑↓ arrows to move videos up or down
- **Edit**: Click the edit icon to modify video details
- **Add**: Click "Add Video" to add a new video
- **Delete**: Click the trash icon to remove a video

### 2. **Manage Client Logos**
- **Reorder**: Use ↑↓ arrows to move logos up or down
- **Edit**: Click the edit icon to modify logo name or folder
- **Add**: Click "Add Logo" to add a new logo
- **Delete**: Click the trash icon to remove a logo

### 3. **Save Changes**
- Click "Save Changes" to store edits in browser localStorage
- Changes are immediately visible on the "Our Work" page (refresh if needed)

### 4. **Export/Import Data**
- **Export**: Download a JSON file with all current data
- **Import**: Upload a previously exported JSON file to restore data
- Useful for backing up or sharing configurations

### 5. **Reset to Defaults**
- Restores original video and logo data
- Clears all custom changes

## How It Works

1. **Data Storage**: Changes are stored in browser localStorage
2. **Immediate Preview**: The "Our Work" page automatically loads from localStorage
3. **Persistence**: Data persists across browser sessions
4. **Multi-Device**: Each device/browser has its own localStorage

## Important Notes

- **Password Security**: The password is stored in plain text in the code. For production, consider implementing proper authentication.
- **Data Persistence**: localStorage is browser-specific. To sync across devices, use Export/Import.
- **Logo Images**: When adding a logo, ensure the image files exist in `/public/logos/[folder-name]/`
- **YouTube URLs**: Paste full YouTube URLs - thumbnails are auto-generated

## Changing the Password

Edit `src/components/Admin.tsx`:

```typescript
const ADMIN_PASSWORD = 'your-new-password-here';
```

Then rebuild and redeploy.

## Troubleshooting

- **Changes not showing**: Refresh the "Our Work" page
- **Can't login**: Check password is correct (case-sensitive)
- **Logo not displaying**: Verify folder name matches `/public/logos/` structure
- **Video thumbnail missing**: Ensure YouTube URL is valid and public

