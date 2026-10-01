# Wall drawing studio

The composer and full-screen drawing interface follow the supplied October 1 screenshots: account avatar/name, 200-character message, drawing preview, 12 pin colors, pink pin action, dotted workspace, white 3:2 paper, and a floating tool rail.

Tools: smooth pen, translucent highlighter, text placement, eraser, preset/custom ink and paper colors, brush size, emoji stickers, undo/redo, 100/150/200% zoom, and undoable clear. Ctrl/Command+Z undoes, Shift+Ctrl/Command+Z or Ctrl/Command+Y redoes. On mobile the tool rail becomes horizontally scrollable at the bottom.

Done commits an editable drawing to the composer. Discard abandons changes from the current editing session. Removing the preview removes the drawing from the draft. Drafts are cleared when the signed-in identity changes; a stale submission response cannot reveal a previous account's draft. No authentication bypass or preview route is shipped.

## Required database update

In Supabase SQL Editor, run `supabase/migrations/202610010002_wall_instant_pins.sql` after the original wall migration. This adds the new color allowlist, 900×600 PNG dimensions, and drawing-only notes. It preserves legacy colors, drawings, and existing notes. Pins publish immediately, including earlier queued visitor notes. Ownership, RLS, PNG size bounds, and posting limits remain in place. OAuth settings and environment values do not change.

## Verification

Automated checks cover drawing coordinate scaling, history branching/undo, eraser compositing, drawing-only notes, 200-character validation, unsupported image dimensions, and database permissions/rate limits. Browser checks use an isolated local component preview without signing in, modifying account settings, or publishing notes. The temporary preview page is removed before the production build. Live storage of new-format pins still requires applying the migration to the hosted database.
