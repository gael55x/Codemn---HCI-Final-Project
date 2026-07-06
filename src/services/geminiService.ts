/**
 * Local, offline "AI mentor". Returns canned, context-aware guidance based on
 * keywords in the user's message. No external API, no keys, no network — the
 * app builds and deploys anywhere without secrets.
 *
 * The exported signature matches the original service so callers are unchanged.
 */
import { getMentorReply } from '../data/demo-data';

export async function askMentor(prompt: string, _context: string = ''): Promise<string> {
  // Small delay so the typing indicator feels natural.
  await new Promise((resolve) => setTimeout(resolve, 550));
  return getMentorReply(prompt);
}
