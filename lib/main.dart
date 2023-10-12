import 'package:akshit_madan/design/utils/app_theme.dart';
import 'package:akshit_madan/features/home/home_page.dart';
import 'package:flutter/material.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.darkTheme,
      title: 'Md. Sifatullah👋 | Software Engineer',
      debugShowCheckedModeBanner: false,
      home: const HomePage(),
    );
  }
}
