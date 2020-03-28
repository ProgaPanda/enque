import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

const app = admin.initializeApp();
const db = app.firestore();

export const enqueue = functions.https.onCall(async ({ ticketData, notificationToken }) => {
  const [queueId, lineId, ticketNum] = Buffer.from(ticketData, 'BASE64').toString().split('-')

  const queueRef = db.doc(`/queues/${queueId}`);
  const ticketsRef = queueRef.collection(`lines/${lineId}/tickets`);

  await ticketsRef.add({ number: +ticketNum, notificationToken })

  const { name, businessName } = (await queueRef.get()).data()!
  return { name, businessName, ticketNum }
})
