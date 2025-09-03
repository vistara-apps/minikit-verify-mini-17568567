import { type NextRequest } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { type FrameRequest } from '@coinbase/onchainkit/frame';
import { WebhookRequest } from '@/app/types';
import { BASE_URL, API_ENDPOINTS } from '@/app/constants';

/**
 * Handles Farcaster frame interactions
 * 
 * @param request The incoming request from Farcaster
 * @returns HTML response for the frame
 */
export async function POST(request: NextRequest) {
  try {
    const body: WebhookRequest = await request.json();
    const { isValid, message } = await getFrameMessage(body as FrameRequest, { 
      neynarApiKey: process.env.NEYNAR_API_KEY 
    });

    // Base URL for the application
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || BASE_URL;
    
    // Webhook endpoint for frame interactions
    const webhookUrl = `${baseUrl}${API_ENDPOINTS.WEBHOOK}`;

    // Handle invalid requests
    if (!isValid) {
      return new Response(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Invalid Request',
            },
          ],
          image: {
            src: `${baseUrl}/error.png`,
            aspectRatio: '1:1',
          },
          postUrl: webhookUrl,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    const { buttonIndex, inputText, fid } = message;

    // Process the frame interaction based on button index
    let responseHtml;
    
    switch (buttonIndex) {
      case 1:
        // Handle primary button click (Verify Now)
        responseHtml = getFrameHtmlResponse({
          buttons: [
            {
              label: 'Continue',
            },
            {
              label: 'Go Back',
            },
          ],
          image: {
            src: `${baseUrl}/success.png`,
            aspectRatio: '1:1',
          },
          postUrl: webhookUrl,
        });
        break;
      
      case 2:
        // Handle secondary button click (Go Back)
        responseHtml = getFrameHtmlResponse({
          buttons: [
            {
              label: 'Start Over',
            },
          ],
          image: {
            src: `${baseUrl}/home.png`,
            aspectRatio: '1:1',
          },
          postUrl: webhookUrl,
        });
        break;
      
      default:
        // Default response (Initial frame)
        responseHtml = getFrameHtmlResponse({
          buttons: [
            {
              label: 'Verify Now',
            },
          ],
          image: {
            src: `${baseUrl}/welcome.png`,
            aspectRatio: '1:1',
          },
          postUrl: webhookUrl,
        });
    }

    return new Response(responseHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Return a generic error frame
    return new Response(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Try Again',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_BASE_URL || BASE_URL}/error.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL || BASE_URL}${API_ENDPOINTS.WEBHOOK}`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}
