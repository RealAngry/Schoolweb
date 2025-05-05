// Discord webhook utility for sending admission form submissions

// Discord message structure
interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  footer?: {
    text: string;
    icon_url?: string;
  };
  timestamp?: string;
}

interface DiscordMessage {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: DiscordEmbed[];
}

// This URL should be replaced with your actual Discord webhook URL
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || '';

/**
 * Sends a message to Discord via webhook
 * @param message The Discord message to send
 * @returns Promise resolving to the fetch response
 */
export const sendToDiscord = async (message: DiscordMessage): Promise<Response> => {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Discord webhook URL is not configured');
    throw new Error('Discord webhook URL is not configured');
  }

  console.info('Sending data to Discord webhook...');
  console.info('Message title:', message.embeds?.[0]?.title || 'No title provided');

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Discord webhook error: ${response.status} ${errorText}`);
    }

    console.info('Successfully sent message to Discord webhook!');
    return response;
  } catch (error) {
    console.error('Error sending to Discord webhook:', error);
    throw error;
  }
};

