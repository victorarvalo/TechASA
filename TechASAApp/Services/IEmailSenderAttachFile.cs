using System.Net.Mail;
using SendGrid.Helpers.Mail;

namespace TechASAApp.Services
{
    public interface IEmailSenderAttachFile
    {
        /// <summary>
        ///     This interface is for send a mail with attached file
        /// </summary>
        Task SendEmailAttachFileAsync(string email, string subject, string htmlMessage,
            List<SendGrid.Helpers.Mail.Attachment> attachments);
    }
}
