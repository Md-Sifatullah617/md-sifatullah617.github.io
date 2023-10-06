import 'package:akshit_madan/design/utils/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:social_media_flutter/widgets/icons.dart';
import 'package:social_media_flutter/widgets/text.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:html' as html;

class ContactUsMobileWidget extends StatelessWidget {
  const ContactUsMobileWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 60),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text(
          'Contact Me',
          style: TextStyle(fontSize: 24),
        ),
        const SizedBox(height: 8),
        const Text(
            "If you are looking for a developer who can build your next big idea or a person who can help you with your existing projects, then you are at the right place. I am always open to discuss your ideas and projects and help you with the best possible solutions. Feel free to contact me anytime. 👇"),
        const SizedBox(height: 8),
        InkWell(
          onTap: () {
            _launchEmail('sifatullah.swe.617@gmail.com');
          },
          child: Text(
            'sifatullah.swe.617@gmail.com',
            style: TextStyle(color: AppColors.purple),
          ),
        ),
        const SizedBox(height: 20),
        SizedBox(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              socialIcon('https://github.com/Md-Sifatullah617',
                  SocialIconsFlutter.github),
              socialIcon('https://www.linkedin.com/in/md-sifatullah617',
                  SocialIconsFlutter.linkedin_box),
              socialIcon('https://www.beecrowd.com.br/judge/en/profile/433345',
                  Icons.code),
              socialIcon('https://www.instagram.com/_._broken.paws._/',
                  SocialIconsFlutter.instagram),
              socialIcon('https://www.facebook.com/md.sifatullah.02/',
                  SocialIconsFlutter.facebook),
            ],
          ),
        ),
        const Divider(),
        const SizedBox(height: 20),
        // const Center(
        //   child: Column(
        //     mainAxisAlignment: MainAxisAlignment.center,
        //     children: [
        //       Text('Coded by Akshit with 💚 in India'),
        //     ],
        //   ),
        // )
      ]),
    );
  }

  _launchEmail(String emailAddress) async {
    final Uri emailLaunchUri = Uri(
      scheme: 'mailto',
      path: emailAddress,
    );

    if (await canLaunchUrl(emailLaunchUri)) {
      await launchUrl(emailLaunchUri);
    } else {
      throw 'Could not launch email';
    }
  }

  Widget socialIcon(String link, IconData iconPath) {
    return InkWell(
      onTap: () => html.window.open(link, '_blank'),
      child: SocialWidget(
        placeholderText: '',
        iconData: iconPath,
        iconSize: 20,
        iconColor: Colors.white,
        link: link,
      ),
    );
  }
}
