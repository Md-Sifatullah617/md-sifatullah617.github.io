import 'package:md_sifatullah/features/contact_us/ui/contact_us_widget.dart';
import 'package:md_sifatullah/features/highlights/ui/highlights_widget.dart';
import 'package:md_sifatullah/features/intro/ui/intro_widget.dart';
import 'package:md_sifatullah/features/techstack/ui/techstack_widget.dart';
import 'package:md_sifatullah/features/videos/ui/videos_widget.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // NavBarWidget(),
          Expanded(
              child: ListView(
            padding: const EdgeInsets.symmetric(horizontal: 40),
            children: const [
              IntroWidget(),
              HighlightsWidget(),
              TechStackWidget(),
              AllProjectWidget(),
              ContactUsWidget()
            ],
          ))
        ],
      ),
    );
  }
}
