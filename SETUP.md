# Kironji Setup Guide

Welcome to Kironji! This guide will help you set up your application with Supabase.

## Prerequisites

- Node.js (v18 or higher)
- A Supabase account ([Sign up here](https://supabase.com))

## Setup Steps

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully set up
3. Note down your project URL and anon key from the project settings

### 2. Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `schema.sql` file
4. Paste it into the SQL Editor and run it
5. This will create all necessary tables, policies, and functions

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173`

## Features

### Authentication
- **Sign Up**: Create a new account with email and password
- **Sign In**: Login to your existing account
- **Protected Routes**: All main pages are protected and require authentication

### Home Page
- Beautiful dashboard with user stats
- Photo gallery with Supabase integration
- Snap photos and save them to the database
- Real-time photo count updates

### Chat System
- Real-time messaging with Supabase Realtime
- Automatic chat room creation for each user
- Message history persistence
- Live message updates without page refresh

### Other Features
- **Events**: Calendar-based event management
- **Memories**: Photo album collections
- **WishList**: Track wish items for different people

## Database Structure

The application uses the following main tables:

- `profiles`: User profiles (extends auth.users)
- `photos`: User photos/snaps
- `memories`: Photo album collections
- `events`: Calendar events
- `wishlist_items`: Wishlist items
- `chat_rooms`: Chat rooms
- `chat_room_participants`: Room memberships
- `messages`: Chat messages

All tables have Row Level Security (RLS) enabled for data protection.

## Troubleshooting

### Authentication Issues
- Make sure your Supabase URL and anon key are correct in `.env.local`
- Verify that the schema has been run successfully
- Check browser console for any errors

### Chat Not Working
- Ensure Realtime is enabled in your Supabase project settings
- Check that the messages table has proper RLS policies
- Verify WebSocket connection in browser network tab

### Photos Not Loading
- Confirm the photos table exists and has data
- Check RLS policies on the photos table
- Verify user is authenticated

## Production Deployment

For production, you'll want to:

1. Set up Supabase Storage for actual image uploads
2. Configure proper environment variables in your hosting platform
3. Enable email confirmation for new signups (in Supabase Auth settings)
4. Set up custom email templates
5. Consider adding image optimization

## Support

If you encounter any issues, please check:
- Supabase project logs
- Browser console errors
- Network tab for failed requests

Enjoy using Kironji! 🎉
