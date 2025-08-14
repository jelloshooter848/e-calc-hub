# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static website hub for electrical engineering calculators. It serves as a landing page that links to various external calculator applications hosted on AWS S3 and GitHub Pages. The project consists of only two files:

- `index.html` - Main landing page with calculator links
- `README.md` - Project documentation

## Architecture

The project is a static HTML website with:
- Single-page application structure using vanilla HTML, CSS (Tailwind CDN), and minimal JavaScript
- No build process or package management required
- Links to 6 external calculator applications:
  - Motor Horsepower Interpolating Calculator (AWS S3)
  - EGC Voltage Drop Calculator (AWS S3) 
  - Conduit Fill and Weight Calculator (AWS S3)
  - Auxiliary Gutter and Surface Wireway Sizing Calculator (GitHub Pages)
  - Pull Box Sizing Calculator (AWS S3)
  - 3D Pull Box Sizing Calculator (GitHub Pages)

## Development

Since this is a static website with no dependencies:
- No package.json or build system
- No linting or testing commands
- Direct file editing and browser preview for development
- Hosted on GitHub Pages at: https://jelloshooter848.github.io/e-calc-hub/

## File Structure

The codebase includes embedded JavaScript for XLSX file processing functionality (lines 1-39 of index.html) that appears to be preparation for future calculator integrations that may handle Excel file uploads.

## Deployment

The site is automatically deployed via GitHub Pages from the master branch. Any changes to index.html will be reflected on the live site.