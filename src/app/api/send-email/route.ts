import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FormData } from '@/components/contact/contact-form';

const resend = new Resend(process.env.RESEND_API_KEY);

// Template d'email de confirmation pour une demande d'information
const getInformationConfirmationTemplate = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirmation de votre demande</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #C9645A;">Merci pour votre demande d'information !</h1>
    
    <p>Bonjour ${data.firstName},</p>
    
    <p>Nous avons bien reçu votre demande d'information et nous vous remercions de votre intérêt pour nos services.</p>
    
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Récapitulatif de votre demande :</h3>
      <p><strong>Sujet :</strong> ${data.subject}</p>
      <p><strong>Message :</strong> ${data.message}</p>
    </div>
    
    <p>Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h.</p>
    
    <p>Cordialement,<br>L'équipe La Petite Vitrine</p>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="font-size: 12px; color: #666;">
      La Petite Vitrine - Votre présence numérique clé en main<br>
      Email: contact@lapetitevitrine.com
    </p>
  </div>
</body>
</html>
`;

// Template d'email de confirmation pour une commande
const getOrderConfirmationTemplate = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirmation de votre commande</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #C9645A;">Merci pour votre commande !</h1>
    
    <p>Bonjour ${data.firstName},</p>
    
    <p>Nous avons bien reçu votre commande pour la création de votre site web et nous vous remercions de votre confiance.</p>
    
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Récapitulatif de votre projet :</h3>
      <p><strong>Entreprise :</strong> ${data.businessName}</p>
      <p><strong>Activité :</strong> ${data.activity}</p>
      <p><strong>Ville :</strong> ${data.city}</p>
      <p><strong>Type de projet :</strong> ${data.projectType}</p>
      <p><strong>Budget :</strong> ${data.budget}</p>
      <p><strong>Délai souhaité :</strong> ${data.timeline}</p>
    </div>
    
    <h3>Prochaines étapes :</h3>
    <ol>
      <li>Notre équipe va analyser votre demande (24-48h)</li>
      <li>Nous vous contacterons pour finaliser les détails</li>
      <li>Création de votre site en 5 jours ouvrés</li>
    </ol>
    
    <p>Nous vous recontacterons très prochainement pour démarrer votre projet.</p>
    
    <p>Cordialement,<br>L'équipe La Petite Vitrine</p>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="font-size: 12px; color: #666;">
      La Petite Vitrine - Votre présence numérique clé en main<br>
      Email: contact@lapetitevitrine.com
    </p>
  </div>
</body>
</html>
`;

// Template d'email interne pour demande d'information
const getInternalInformationTemplate = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nouvelle demande d'information</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #C9645A;">Nouvelle demande d'information</h1>
    
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Informations du contact :</h3>
      <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone}</p>
      <p><strong>Entreprise :</strong> ${data.company}</p>
    </div>
    
    <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Message :</h3>
      <p><strong>Sujet :</strong> ${data.subject}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
  </div>
</body>
</html>
`;

// Template d'email interne pour commande
const getInternalOrderTemplate = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nouvelle commande de site web</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #C9645A;">Nouvelle commande de site web</h1>
    
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Informations du client :</h3>
      <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone}</p>
      <p><strong>Entreprise :</strong> ${data.company}</p>
    </div>
    
    <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Détails du projet :</h3>
      <p><strong>Nom de l'entreprise :</strong> ${data.businessName}</p>
      <p><strong>Activité :</strong> ${data.activity}</p>
      <p><strong>Ville :</strong> ${data.city}</p>
      <p><strong>Code postal :</strong> ${data.postalCode}</p>
      <p><strong>Cible :</strong> ${data.targetAudience}</p>
      <p><strong>Site actuel :</strong> ${data.currentWebsite || 'Aucun'}</p>
    </div>
    
    <div style="background: #fff7ed; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3>Spécifications :</h3>
      <p><strong>Type de projet :</strong> ${data.projectType}</p>
      <p><strong>Budget :</strong> ${data.budget}</p>
      <p><strong>Délai :</strong> ${data.timeline}</p>
      <p><strong>Projet urgent :</strong> ${data.urgentProject ? 'Oui' : 'Non'}</p>
      
      <h4>Sections souhaitées :</h4>
      <ul>
        ${data.sections.about ? '<li>À propos</li>' : ''}
        ${data.sections.services ? '<li>Services</li>' : ''}
        ${data.sections.portfolio ? '<li>Portfolio</li>' : ''}
        ${data.sections.practicalInfo ? '<li>Informations pratiques</li>' : ''}
        ${data.sections.contactForm ? '<li>Formulaire de contact</li>' : ''}
      </ul>
      
      ${data.description ? `<p><strong>Description :</strong> ${data.description}</p>` : ''}
      ${data.additionalInfo ? `<p><strong>Informations supplémentaires :</strong> ${data.additionalInfo}</p>` : ''}
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();
    
    // Vérification des données requises
    if (!data.email || !data.firstName || !data.lastName) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    const isOrder = data.requestType === 'quote';
    
    // Email de confirmation au client
    const clientSubject = isOrder 
      ? 'Confirmation de votre commande - La Petite Vitrine'
      : 'Confirmation de votre demande - La Petite Vitrine';
      
    const clientTemplate = isOrder 
      ? getOrderConfirmationTemplate(data)
      : getInformationConfirmationTemplate(data);

    // Email interne
    const internalSubject = isOrder 
      ? `Nouvelle commande de ${data.firstName} ${data.lastName}`
      : `Nouvelle demande d'information de ${data.firstName} ${data.lastName}`;
      
    const internalTemplate = isOrder 
      ? getInternalOrderTemplate(data)
      : getInternalInformationTemplate(data);

    // Envoi des emails
    const [clientEmail, internalEmail] = await Promise.all([
      // Email au client
      resend.emails.send({
        from: 'La Petite Vitrine <noreply@lapetitevitrine.com>',
        to: data.email,
        subject: clientSubject,
        html: clientTemplate,
      }),
      
      // Email interne
      resend.emails.send({
        from: 'Formulaire Web <noreply@lapetitevitrine.com>',
        to: 'contact@lapetitevitrine.com',
        subject: internalSubject,
        html: internalTemplate,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Emails envoyés avec succès',
      clientEmailId: clientEmail.data?.id,
      internalEmailId: internalEmail.data?.id,
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi des emails' },
      { status: 500 }
    );
  }
}
