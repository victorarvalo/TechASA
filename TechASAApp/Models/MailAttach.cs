using SendGrid.Helpers.Mail;
namespace TechASAApp.Models
{
    public class MailAttach
    {
        public List<Attachment> attachments { get; set; }
        public string email { get; set; }
        public string subject { get; set; }
        public string htmlMessage { get; set; }
    }
}
