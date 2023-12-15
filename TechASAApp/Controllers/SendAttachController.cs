using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using TechASAApp.Services;

namespace TechASAApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SendAttachController : ControllerBase
    {
        private readonly ILogger<SendAttachController> _logger;
        private readonly IEmailSenderAttachFile _emailSenderAttachFile;

        public SendAttachController(ILogger<SendAttachController> logger,
            IEmailSenderAttachFile emailSenderAttachFile)
        {
            this._logger = logger;
            this._emailSenderAttachFile = emailSenderAttachFile;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Models.MailAttach message)
        {
            await _emailSenderAttachFile.SendEmailAttachFileAsync(message.email,
                message.subject,
                message.htmlMessage,
                message.attachments);            
            return Ok();
        }
    }
}
