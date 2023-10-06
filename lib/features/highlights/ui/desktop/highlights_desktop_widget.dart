import 'package:akshit_madan/design/constants/app_images.dart';
import 'package:akshit_madan/design/utils/app_colors.dart';
import 'package:akshit_madan/design/widgets/app_image_widget.dart';
import 'package:akshit_madan/design/widgets/buttons/app_outlined_button.dart';
import 'package:flutter/material.dart';
import 'dart:html' as html;

class HighlightsDesktopWidget extends StatelessWidget {
  const HighlightsDesktopWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 100),
      child: Stack(
        children: [
          Align(
            alignment: Alignment.bottomLeft,
            child: Container(
              height: 100,
              width: 100,
              decoration: BoxDecoration(color: Colors.transparent, boxShadow: [
                BoxShadow(
                  blurRadius: 200,
                  spreadRadius: 200,
                  color: AppColors.purple.withOpacity(0.4),
                )
              ]),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Highlights',
                style: TextStyle(fontSize: 40),
              ),
              const SizedBox(height: 40),
              Wrap(
                runSpacing: 20,
                spacing: 20,
                direction: Axis.horizontal,
                children: [
                  highlightContainer(
                      context,
                      true,
                      '1K+ Downloads',
                      AppImages.bookmarkImage,
                      'My First App named Ostadjee, a Flutter App, has crossed 1K+ Downloads on Play Store. Though it is not maintained after the first release, it is still available on Play Store.',
                      'VISIT PLAY STORE',
                      link:
                          'https://play.google.com/store/search?q=ostadjee&c=apps'),
                  highlightContainer(
                      context,
                      true,
                      'Ex-Intern @DeshIT-BD',
                      AppImages.bulbImage,
                      'Worked at Deshit-BD as a Flutter Developer Intern for 4 months.',
                      'VISIT DeshIT-BD',
                      link: "https://www.deshit-bd.com/"),
                  highlightContainer(
                      context,
                      false,
                      '2+ Website & 25+ Apps',
                      AppImages.cupImage,
                      'From the journey of 1 year, I have developed 25+ Apps and 2+ Websites using Flutter and Firebase.',
                      'VISIT CHANNEL'),
                  highlightContainer(
                      context,
                      false,
                      'Cyber Security Enthusiast',
                      AppImages.pickerImage,
                      "With a passion for Cyber Security, I'm always learning new things about it.",
                      'VISIT CHANNEL'),
                ],
              )
            ],
          )
        ],
      ),
    );
  }

  Widget highlightContainer(BuildContext context, bool showButton, String topic,
      imagePath, text, buttonText,
      {String? link}) {
    double w = MediaQuery.of(context).size.width;
    return Container(
      width: w / 2.4,
      height: 260,
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
      decoration: BoxDecoration(
          color: AppColors.purpleDark.withOpacity(0.5),
          borderRadius: BorderRadius.circular(20)),
      child: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            AppImageWidget(
              imageWidth: 100,
              imageHeight: 100,
              path: imagePath,
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    topic,
                    style: const TextStyle(
                        fontSize: 26, height: 1.4, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    text,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    // style: TextStyle(fontSize: w / 80),
                  ),
                  const SizedBox(height: 10),
                  showButton
                      ? AppOutlinedButton(
                          title: buttonText,
                          textStyle: const TextStyle(fontSize: 12),
                          onTap: () => html.window.open(link!, '_blank'),
                        )
                      : const SizedBox.shrink()
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
