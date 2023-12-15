using SendGrid.Helpers.Mail;
using SendGrid;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace TechASAApp.Services
{
    public class EmailSenderAttachFile : IEmailSenderAttachFile
    {
        private readonly ILogger<EmailSenderAttachFile> _logger;

        public AuthMessageSenderOptions Options { get; }
        public EmailSenderAttachFile(IOptions<AuthMessageSenderOptions> optionsAccessor, 
            ILogger<EmailSenderAttachFile> logger)
        {
            Options = optionsAccessor.Value;
            this._logger = logger;
        }

        public async Task SendEmailAttachFileAsync(string email, string subject, string htmlMessage,
            List<SendGrid.Helpers.Mail.Attachment> attachments)
        {
            if (string.IsNullOrEmpty(Options.SendGridKey))
            {
                throw new Exception("Null SendGridKey");
            }
            await Execute(Options.SendGridKey, subject, htmlMessage, email, attachments);
        }

        public async Task Execute(string apiKey, string subject, string message, string toEmail,
            List<SendGrid.Helpers.Mail.Attachment> attachments)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(Options.email, "TechA S.A."),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message,
                Attachments = attachments
            };
            msg.AddTo(new EmailAddress(toEmail));

            // Disable click tracking.
            // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
            msg.SetClickTracking(false, false);
            var response = await client.SendEmailAsync(msg);
            _logger.LogInformation(response.IsSuccessStatusCode
                                   ? $"Email to {toEmail} queued successfully!"
                                   : $"Failure Email to {toEmail}");
        }

    }
}
