import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:md_sifatullah/design/constants/app_images.dart';
import 'package:md_sifatullah/design/utils/app_colors.dart';
import 'package:md_sifatullah/design/widgets/app_image_widget.dart';
import 'package:md_sifatullah/design/widgets/buttons/app_outlined_button.dart';
import 'package:url_launcher/url_launcher.dart';

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
                  color: AppColors.purple.withValues(alpha: 0.4),
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
              StaggeredGrid.count(
                crossAxisCount: 2,
                crossAxisSpacing: 20,
                mainAxisSpacing: 20,
                children: [
                  StaggeredGridTile.fit(
                    crossAxisCellCount: 1,
                    child: highlightContainer(
                        context,
                        true,
                        '100+ Downloads',
                        AppImages.bookmarkImage,
                        "Charge.AI simplifies managing your electric vehicle (EV) charging experience, offering real-time access to a wide network of charging stations and seamless integration with your fleet. Whether you're at home, work, or on the road, Charge.AI provides a fast, reliable, and smart charging experience tailored to your needs.",
                        'VISIT PLAY STORE',
                        link:
                            'https://play.google.com/store/apps/details?id=com.mulytic_energy.chargeai'),
                  ),
                  StaggeredGridTile.fit(
                    crossAxisCellCount: 1,
                    child: highlightContainer(
                        context,
                        true,
                        'Ex-Flutter Engineer @DeshIT-BD',
                        AppImages.bulbImage,
                        'Worked at Deshit-BD as a Flutter Developer for 12+ months.',
                        'VISIT DeshIT-BD',
                        link: "https://www.deshit-bd.com/"),
                  ),
                  StaggeredGridTile.fit(
                    crossAxisCellCount: 1,
                    child: highlightContainer(
                        context,
                        false,
                        '4+ Website & 25+ Apps',
                        AppImages.cupImage,
                        'From the journey of 3 years, I have developed 25+ Apps and 4+ Websites using Flutter, Firebase and other technologies.',
                        'VISIT CHANNEL'),
                  ),
                  StaggeredGridTile.fit(
                    crossAxisCellCount: 1,
                    child: highlightContainer(
                        context,
                        false,
                        'Cyber Security Enthusiast',
                        AppImages.pickerImage,
                        "With a passion for Cyber Security, I'm always learning new things about it.",
                        'VISIT CHANNEL'),
                  ),
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
    return Container(
      // width: w / 2.4, // Removed to allow dynamic width from grid
      // height: 260,
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
      decoration: BoxDecoration(
          color: AppColors.purpleDark.withValues(alpha: 0.5),
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
                          onTap: () => launchUrl(Uri.parse(link!)),
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
