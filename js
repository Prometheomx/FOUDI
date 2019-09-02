/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.signedassetsnetwork.AgregarFirmador} agregaFirmador - the trade to be processed
 * @transaction
 */
async function agregaFirmador(agregaFirmador) {

    // set the new signer of the document
    agregaFirmador.document.firmador = agregaFirmador.firmador;
    let assetRegistry = await getAssetRegistry('org.example.signedassetsnetwork.Document');

    // emit a notification that a new signer has occurred
    let addSignerNotification = getFactory().newEvent('org.example.signedassetsnetwork', 'NotificacionFirmador');
    addSignerNotification.document = agregaFirmador.document;
    emit(addSignerNotification);

    // persist the state of the document
    await assetRegistry.update(agregaFirmador.document);
}
